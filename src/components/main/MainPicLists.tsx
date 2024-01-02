import { db } from '@/common/firebase_hm';
import { MainPicListsProps } from '@/type/mainPicListsPropsType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PicList } from '@/type/picListsType';
import { collection, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { fetchSearchedListByTag } from '@/pages/api/picLists';
import { useSession } from 'next-auth/react';
import styled, { keyframes } from 'styled-components';

type SortedBy = 'id' | 'likes';

const likeAnimation = keyframes`
0% {
  transform: scale(1);
}
50% {
  transform: scale(1.2);
}
100% {
  transform: scale(1);
}
`;
const MainPicLists: React.FC<MainPicListsProps> = ({
  searchedPictures,
  setSearchedPictures,
  isSearching,
  setIsSearching,
  tag,
  initialPicLists,
  data,
  likes,
  searchKeyword,
  setLikes
}) => {
 
  const [picLists, setPicLists] = useState<PicList[]>([]);
  const queryClient = useQueryClient();
  const [isLikesPicsPreFetched, setIsLikesPicsPreFetched] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortedBy>('id');
  const [isLikesClicked, setIsLikesClicked] = useState<boolean>(false);
  const [likedPics, setLikedPics] = useState<string[]>([]); // 좋아요한 사진 ID 목록을 추적하는 상태

  // 테스트코드
  const handleLikeClick = (picId: string) => {
    // 현재 사진이 좋아요되어 있는지 확인
    const isLiked = likedPics.includes(picId);

    // 좋아요 토글 (좋아요되어 있으면 제거, 아니면 추가)
    if (isLiked) {
      setLikedPics((prev) => prev.filter((id) => id !== picId));
    } else {
      setLikedPics((prev) => [...prev, picId]);
    }
  };

  const handlerFilterdLikedPics = async () => {
    // 미리 가져오기 로직이 실행되지 않았다면 실행
    setLikes('likes');
    const result = await queryClient.getQueryData(['picLists', tag, searchKeyword, likes]);
    setIsLikesClicked((prev) => !prev);
  };
  const { data: session, status } = useSession();

  console.log('메인픽리스트에서 데이터 보여줘', data);
  return (
    <>
      <LikeButton onClick={handlerFilterdLikedPics}>좋아요 많은 순</LikeButton>
      <StListContainer>
        {isLikesClicked === false ? (
          <StPictureCardContainer>
            {data ? (
              <StPictureCard>
                {data?.map((pic) => {
                  return (
                    <StPicture key={pic.id}>
                      <StLikeWrapper>
                        {likedPics.includes(pic.id) ? (
                          <StLikeImage
                            src="/like_red.png"
                            alt="after like"
                            width={40}
                            height={40}
                            onClick={() => handleLikeClick(pic.id)}
                          />
                        ) : (
                          <StAfterLikeImage
                            src="/like_gray.png"
                            alt="like"
                            width={40}
                            height={40}
                            onClick={() => handleLikeClick(pic.id)}
                          />
                        )}
                      </StLikeWrapper>
                      <StImage src={pic.imgPath} alt="picture" width={250} height={200} />
                      <StAdditionalInfo>
                        <StInfoContainer>
                          {/* <p>{pic.originID}</p> */}
                          <StWriterInfo>
                            <Image src="/default_profile_image.png" alt="작가 프로필 이미지" width={40} height={40} />
                            <p>{pic.writerID}</p>
                          </StWriterInfo>
                          <StTagsInfo>
                            <p> #{pic.tags.join(' #')}</p>
                          </StTagsInfo>
                        </StInfoContainer>
                      </StAdditionalInfo>
                    </StPicture>
                  );
                })}
              </StPictureCard>
            ) : (
              <>
                <h1>점검 중입니다.</h1>
              </>
            )}
          </StPictureCardContainer>
        ) : (
          // like 활성화, data 있을때
          // <>{data?.filter((pic) => {})}</>
          <StPictureCard>
            {data?.map((pic) => {
              return (
                <StPicture key={pic.id}>
                  <StLikeWrapper>
                    {likedPics.includes(pic.id) ? (
                      <StLikeImage
                        src="/like_red.png"
                        alt="after like"
                        width={40}
                        height={40}
                        onClick={() => handleLikeClick(pic.id)}
                      />
                    ) : (
                      <StAfterLikeImage
                        src="/like_gray.png"
                        alt="like"
                        width={40}
                        height={40}
                        onClick={() => handleLikeClick(pic.id)}
                      />
                    )}
                  </StLikeWrapper>
                  <StImage src={pic.imgPath} alt="picture" width={250} height={200} />
                  <StAdditionalInfo>
                    <StInfoContainer>
                      {/* <p>{pic.originID}</p> */}
                      <StWriterInfo>
                        <Image src="/default_profile_image.png" alt="작가 프로필 이미지" width={40} height={40} />
                        <p>{pic.writerID}</p>
                      </StWriterInfo>
                      <StTagsInfo>
                        <p> #{pic.tags.join(' #')}</p>
                      </StTagsInfo>
                    </StInfoContainer>
                  </StAdditionalInfo>
                </StPicture>
              );
            })}
          </StPictureCard>
        )}
      </StListContainer>
    </>
  );
};

export default MainPicLists;

const LikeButton = styled.button`
  margin-left: 8rem;
  margin-top: 4rem;
  padding: 10px;
  width: 8rem;
  border: none;
  border: 1px solid #ccc; /* 테두리 스타일 */
  color: #333; /* 글자색 */
  transition: transform 0.2s, box-shadow 0.3s; /* 애니메이션 효과 */
  border-radius: 10rem;
  background-color: #f9f9f9; /* 배경색 */

  &:hover {
    transform: translateY(-2px); /* 약간 위로 이동하는 효과 */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
    cursor: pointer;
    font-weight: bold;
    background-color: white;
  }
`;
const StTagsInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  p {
    margin: 0;
  }
`;
const StListContainer = styled.ul`
  // border: 1px solid black;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
`;

const StPictureCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StPictureCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
`;

const StLikeImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: filter 0.4s ease-in-out;

  &:hover {
    filter: brightness(110%);
    animation: ${likeAnimation} 0.5s ease-in-out;
  }
`;

const StAfterLikeImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: filter 0.4s ease-in-out;
  filter: brightness(90%);
  &:hover {
    filter: brightness(70%);
    // animation: ${likeAnimation} 0.5s ease-in-out;
  }
`;

const StImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const StInfoContainer = styled.div`
  p:first-child {
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    font-size: 1.2rem;
  }
`;
const StWriterInfo = styled.div`
  display: flex;
  flex-dircetion: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0;
  font-size: 1rem;
  p {
    margin-top: 0.5rem;
  }
`;

const StLikeWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 999;
`;

const StPicture = styled.li`
  position: relative;
  width: 25rem;
  height: 25rem;
  list-style: none;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  transition: box-shadow 0.25s ease-in-out;

  &:hover {
    transform: scale(1.002);
    box-shadow: 8px 0 12px -5px gray, -8px 0 12px -5px gray;
  }

  &:hover ${StLikeWrapper} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out, filter 0.4s ease-in-out;

  ${StPicture}:hover & {
    filter: brightness(70%);
  }
`;

const StAdditionalInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease, opacity 0.3s ease;

  ${StPicture}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

// import { db } from '../../common/firebase.my';
// import { Firestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
// import * as S from '../../styles/Main.style';
// import React, { useEffect, useState } from 'react';

// const MainPicLists = () => {
//   const [piclists, setPicLists] = useState([]);
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const sampleCollection = collection(db, 'sample');
//         const Snapshot = await getDocs(sampleCollection);
//         return Snapshot.docs;
//       } catch (error) {
//         // console.log('error를 말해', error);
//       }
//     };
//     fetch().then((res) =>
//       // console.log(
//         'res',
//         res?.map((list) => list.data())
//       )
//     );
//   }, []);

//   return (
//     <>
//       <S.FILTER_BUTTON_WRAPPER>
//         <S.FILTER_BUTTON>다운로드 많은순</S.FILTER_BUTTON>
//         <S.FILTER_BUTTON>좋아요 많은 순 </S.FILTER_BUTTON>
//       </S.FILTER_BUTTON_WRAPPER>
//     </>
//   );
// };

// export default MainPicLists;

// export const getServerSideProps: GetServerSideProps<MainProps> = async () => {
//   try {
//     const sampleCollection = collection(db, 'findpicLists');
//     const Snapshot = await getDocs(sampleCollection);
//     const responseData = Snapshot.docs.map((doc) => doc.data()) as PicList[];

//     // console.log('responseData:', responseData);

//     return {
//       props: {
//         initialPicLists: responseData
//       }
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         initialPicLists: []
//       }
//     };
//   }
//
