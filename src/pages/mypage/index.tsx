import { db } from '@/common/firebase_RK';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export default function MyPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const userImg = session?.user?.image;

  const [example, setExample] = useState<any[]>([]);
  const [position, setPosition] = useState<number>(0);

  const moveLeft = () => {
    if (position < 0) setPosition((prev) => prev + 100);
  };

  const moveRight = () => {
    if (position > -(example.length * 100 - 100)) setPosition((prev) => prev - 100);
  };

  useEffect(() => {
    // DB 유저 정보 state에 저장
    const getDB = async () => {
      if (user) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userdata: any = [];
        querySnapshot.docs.forEach((item: any) => userdata.push(item.data()));

        const likedList = userdata.length > 0 ? userdata[0].liked : [];

        getImg(likedList);
      }
    };

    // 유저 정보의 liked를 바탕으로 img를 검색해서 가져옴
    const getImg = async (liked: string[]) => {
      const photosRef = collection(db, 'photos');
      const imagesId: any = [];
      liked?.forEach((imgList, i) => {
        const q = query(photosRef, where('id', '==', imgList));
        imagesId.push(q);
      });

      try {
        // DB에서 이미지 ID로 서칭
        const promises = imagesId.map(async (el: any) => {
          const querySnapshot = await getDocs(el);
          return querySnapshot.docs.map((item: any) => item.data());
        });

        const results = await Promise.all(promises);
        const foundedPhoto = results.flat(); // 결과를 하나의 배열로 펼침
        setExample(foundedPhoto);
      } catch (error) {
        console.error(error);
      }
    };

    getDB();
  }, [user]);
  if (!session?.user)
    return (
      <StNoLogined>
        <StNoLoginedMent>로그인 후 이용 부탁드립니다</StNoLoginedMent>
      </StNoLogined>
    );
  return (
    <StPageContainer>
      <StUserSection>
        <StUserIconBox>
          {user?.image ? (
            <StUserIcon src={user.image} alt="user image" width={150} height={150} />
          ) : (
            <div>No Image Available</div>
          )}
          <StUsername>{user?.name}</StUsername>
        </StUserIconBox>
      </StUserSection>
      <StSectionTitle>♥️ 좋아요 목록 ♥️</StSectionTitle>
      <StLikedContainer>
        <StLikedSliderContainer $length={example.length}>
          {example?.map((photo, i) => {
            return (
              <StLikedPhotoBox key={i} $currentPosition={position} $length={example.length}>
                <StImageStyle src={photo?.imgPath} width={1200} height={1500} alt="i" />
              </StLikedPhotoBox>
            );
          })}
        </StLikedSliderContainer>
        <StArrow src="/left.png" alt="go left" $position={'left'} onClick={moveLeft} width={0} height={0} />
        <StArrow src="/right.png" alt="go right" $position={'right'} onClick={moveRight} width={0} height={0} />
      </StLikedContainer>
    </StPageContainer>
  );
}

const StPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  margin: auto;
  padding: 3rem 1rem;
`;

const StSectionTitle = styled.h3`
  width: 100%;
  font-weight: 600;
  margin-block: 2rem;

  text-align: center;
`;

const StLikedContainer = styled.section`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const StLikedSliderContainer = styled.section<any>`
  width: ${(props) => `${props.$length * 100}vw`};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StLikedPhotoBox = styled.div<any>`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  transform: ${(props) => `translateX(${props.$currentPosition}vw)`};
`;

const StImageStyle = styled(Image)`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const StArrow = styled(Image)<any>`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 2rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  cursor: pointer;
  ${(props) => {
    if (props.$position === 'left') {
      return css`
        left: 5%;
      `;
    } else {
      return css`
        right: 5%;
      `;
    }
  }}
`;

const StNoLogined = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const StNoLoginedMent = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StUserSection = styled.section`
  width: 100%;
  padding: 3rem;
  text-align: center;
`;

const StUserIconBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: auto;
  padding: 1rem;
`;

const StUserIcon = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: auto;
`;

const StUsername = styled.h2`
  margin-block: 1rem;
`;
