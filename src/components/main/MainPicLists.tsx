import { db } from '@/common/firebase_hm';
import { MainPicListsProps } from '@/type/mainPicListsPropsType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PicList } from '@/type/picListsType';
import { collection, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { fetchSearchedListByTag } from '@/pages/api/picLists';
type SortedBy = 'id' | 'likes';
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
  //서버사이드로 부터 가져오는 데이터
  // -------------------
  // console.log('initialPicLists in MainPicLists', initialPicLists);
  // ---------------------
  //서버사이드로 부터 가져오는 데이터
  const [picLists, setPicLists] = useState<PicList[]>([]);
  const queryClient = useQueryClient();
  const [isLikesPicsPreFetched, setIsLikesPicsPreFetched] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortedBy>('id');
  const [isLikesClicked, setIsLikesClicked] = useState<boolean>(false);
  const handlerFilterdLikedPics = async () => {
    // 미리 가져오기 로직이 실행되지 않았다면 실행
    setLikes('likes');
    const result = await queryClient.getQueryData(['picLists', tag, searchKeyword, likes]);
    console.log('result:', result);
    setIsLikesClicked((prev) => !prev);
  };

  console.log('과연 무슨 데이터가 /', data);

  return (
    <>
      <button onClick={handlerFilterdLikedPics}>좋아요 많은 순 으로</button>
      <StListContainer>
        {isLikesClicked === false ? (
          <>
            {data ? (
              <StPictureCard>
                {data?.map((pic) => {
                  return (
                    <StPicture key={pic.id}>
                      <p>{pic.id}</p>
                      <p>likes: {pic.likes}</p>
                      <p>{pic.originID}</p>
                      <p>{pic.writerID}</p>
                      <p>{pic.tags}</p>
                      <Image src={pic.imgPath} alt="" width={200} height={200} />
                    </StPicture>
                  );
                })}
              </StPictureCard>
            ) : (
              <>
                <h1>점검 중입니다.</h1>
              </>
            )}
          </>
        ) : (
          // like 활성화, data 있을때
          // <>{data?.filter((pic) => {})}</>
          <StPictureCard>
            {data?.map((pic) => {
              return (
                <StPicture key={pic.id}>
                  <p>{pic.id}</p>
                  <p>likes: {pic.likes}</p>
                  <p>{pic.originID}</p>
                  <p>{pic.writerID}</p>
                  <p>{pic.tags}</p>
                  <Image src={pic.imgPath} alt="" width={200} height={200} />
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

// export const getServerSideProps: GetServerSideProps<MainProps> = async () => {
//   try {
//     const sampleCollection = collection(db, 'findpicLists');
//     const Snapshot = await getDocs(sampleCollection);
//     const responseData = Snapshot.docs.map((doc) => doc.data()) as PicList[];

//     console.log('responseData:', responseData);

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
// };

const StListContainer = styled.ul`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
`;

const StPictureCard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StPicture = styled.li`
  background-color: pink;
  width: 15rem;
  height: 30rem;
  list-style: none;
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
//         console.log('error를 말해', error);
//       }
//     };
//     fetch().then((res) =>
//       console.log(
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
