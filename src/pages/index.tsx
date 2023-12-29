import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Header from '@/components/main/Header';
import MainPicLists from '@/components/main/MainPicLists';
import SearchEngine from '@/components/main/SearchEngine';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '@/common/firebase_hm';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { PicList } from '@/type/picListsType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchedListByTag } from './api/picLists';
import { sortedBy } from '@/type/sortedByType';
import { InitialPicLists } from '@/type/initialPicLists';
import { searchByKeyword } from './api/picLists';
//--------------------------------
// type SortedBy = 'id' | 'downloads' | 'likes';

//   const [sortedBy, setSortedBy] = useState<SortedBy>('id');

// const handlerFilterdLikedPics = () => {
//     setSortedBy('likes');
//   };

// const { data, isError, isPending } = useQuery({
//     queryKey: ['picLists', { sortedBy }],
//     queryFn: () => {
//       if (sortedBy === 'id') return getPicsList();
//       else if (sortedBy === 'likes') return filterdLikeList();
//       else if (sortedBy === 'downloads') return filterdDownloadList();
//
//   });

//--------------------------------

// function Main<initialPicLists>() {
function Main({ initialPicLists }: { initialPicLists: InitialPicLists }) {
  const [picLists, setPicLists] = useState<PicList[]>();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  // const [searchKeyword, setSearchKeyword] = useState<sortedBy>('ALL');
  const [searchedPictures, setSearchedPictures] = useState<PicList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const TAGS: string[] = ['ALL', 'dog', 'park', 'girl', 'man'];
  const [tag, setTag] = useState<sortedBy>('ALL');
  const [likes, setLikes] = useState<sortedByLike>('undefined');
  const typeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  console.log('initialPicLists', initialPicLists);

  const changeTagType = (tags: string) => {
    if (tags === 'ALL') setTag(tags);
    if (tags === 'dog') setTag(tags);
    if (tags === 'park') setTag(tags);
    if (tags === 'girl') setTag(tags);
    if (tags === 'man') setTag(tags);
  };
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery<PicList[]>({
    queryKey: ['picLists', tag, searchKeyword, likes],
    queryFn: (a) => {
      console.log('sss', a);
      return fetchSearchedListByTag(tag, searchKeyword, likes);
    }
  });

  // console.log('선택된 태그로 필터링된 데이터', data);
  console.log('쿼리키에 따른 데이터 in index', data);

  return (
    <StMainContainer>
      <Header />
      <StSearchEngineContainer>
        <SearchEngine
          tag={tag}
          likes={likes}
          searchByKeyword={searchByKeyword}
          typeKeyword={typeKeyword}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <StTagContainer>
          {TAGS.map((tag: string, index: number) => (
            // <StTag key={index} onClick={() => fetchSearchedListByTag(tag)}>
            <StTag key={index} onClick={() => changeTagType(tag)}>
              # {tag}
            </StTag>
          ))}
        </StTagContainer>
      </StSearchEngineContainer>

      <MainPicLists
        searchedPictures={searchedPictures}
        setSearchedPictures={setSearchedPictures}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
        tag={tag}
        initialPicLists={initialPicLists}
        data={data}
      />
    </StMainContainer>
  );
}

export default Main;

// 페이지가 서버에서 렌더링될 때 한 번 실행되어 초기 데이터를 가져와 페이지에 주입
export async function getServerSideProps() {
  const sampleCollection = collection(db, 'findpicLists');
  const q = query(sampleCollection);

  try {
    const Snapshot = await getDocs(q);
    const pictureList = Snapshot.docs.map((doc) => doc.data() as PicList);
    // console.log('pictureList in serversidee', pictureList);
    // console.error('pictureList in serversidee', pictureList);
    // 반환된 데이터를 props로 전달
    return {
      props: {
        initialPicLists: pictureList
      }
    };
  } catch (error) {
    console.log('에러', error);

    // 에러 발생 시 빈 배열을 props로 전달
    return {
      props: {
        initialPicLists: []
      }
    };
  }
}

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTagContainer = styled.ul`
  width: 35rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

const StTag = styled.li`
  list-style-type: none;
  border: 1px solid black;
  width: 4rem;
  height: 1.5rem;
  border-radius: 3rem;
  padding: 0.09rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const StSearchEngineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightyellow;
  margin-top: 4.5rem;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;
