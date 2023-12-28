import { db } from '@/common/firebase_hm';
import { MainPicListsProps } from '@/type/mainPicListsPropsType';

import { PicList } from '@/type/picListsType';
import { collection, getDocs } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const MainPicLists: React.FC<MainPicListsProps> = ({
  searchedPictures,
  setSearchedPictures,
  isSearching,
  setIsSearching
}) => {
  const [picLists, setPicLists] = useState<PicList[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const sampleCollection = collection(db, 'findpicLists');
        const Snapshot = await getDocs(sampleCollection);
        const responseData = Snapshot.docs.map((doc) => doc.data());
        console.log('responseData in mainpiclists', responseData);
        setPicLists(responseData as PicList[]);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetch();
  }, []);
  return (
    <StListContainer>
      {isSearching ? (
        <>
          {searchedPictures?.map((pic) => {
            return (
              <StPicture key={pic.id}>
                <p>{pic.tags}</p>
                <p>{pic.id}</p>
                <p>{pic.likes}</p>
                <p>{pic.originID}</p>
                <p>{pic.writerID}</p>
                <p>{pic.tags.join(',')}</p>
              </StPicture>
            );
          })}
        </>
      ) : (
        <>
          {picLists?.map((pic) => {
            return (
              <StPicture key={pic.id}>
                <p>{pic.tags}</p>
                <p>{pic.id}</p>
                <p>{pic.likes}</p>
                <p>{pic.originID}</p>
                <p>{pic.writerID}</p>
                <p>{pic.tags.join(',')}</p>
              </StPicture>
            );
          })}
        </>
      )}
    </StListContainer>
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

const StPicture = styled.li`
  background-color: pink;
  width: 15rem;
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
