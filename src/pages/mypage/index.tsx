import { db } from '@/common/firebase_RK';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export default function MyPage() {
  const { data: session } = useSession();
  const user = session?.user;

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

        // 예시로 첫 번째 문서의 liked를 가져옴
        const likedList = userdata.length > 0 ? userdata[0].liked : [];

        // 가져온 liked로 이미지 가져오는 함수 호출
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

      // DB에서 이미지 ID로 서칭
      const foundedPhoto: any = [];
      imagesId.forEach(async (el: any) => {
        const querySnapshot = await getDocs(el);
        querySnapshot.forEach((item: any) => {
          foundedPhoto.push(item.data());
        });
      });
      setExample(foundedPhoto);
    };

    getDB();
  }, [user]);

  return (
    <StPageContainer>
      <StSectionTitle>❤️ 좋아요 목록</StSectionTitle>
      <StLikedContainer>
        <StLikedSliderContainer $length={example.length}>
          {example?.map((photo, i) => {
            return (
              <StLikedPhotoBox key={i} $currentPosition={position}>
                <StImageStyle src={photo?.imgPath} width={1400} height={1400} alt="i" />
              </StLikedPhotoBox>
            );
          })}
        </StLikedSliderContainer>
        <StArrow $position={'left'} onClick={moveLeft}>
          ⬅️
        </StArrow>
        <StArrow $position={'right'} onClick={moveRight}>
          ➡️
        </StArrow>
      </StLikedContainer>
    </StPageContainer>
  );
}

const StPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

const StSectionTitle = styled.h3`
  width: 100%;
  font-weight: 600;
  margin-block: 2rem;
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
  width: 100vw;
  height: 500px;
  transition: all 1s ease;
  transform: ${(props) => `translateX(${props.$currentPosition}vw)`};
`;

const StImageStyle = styled(Image)`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

const StArrow = styled.div<any>`
  width: fit-content;
  height: fit-content;
  font-size: 2rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  cursor: pointer;
  ${(props) => {
    if (props.$position === 'left') {
      return css`
        left: 2%;
      `;
    } else {
      return css`
        right: 2%;
      `;
    }
  }}
`;
