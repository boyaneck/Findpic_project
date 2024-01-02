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
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchedListByTag } from './api/picLists';
import { sortedBy } from '@/type/sortedByType';
import { InitialPicLists } from '@/type/initialPicLists';
// import { searchByKeyword } from './api/picLists';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

// function Main<initialPicLists>() {
function Main({ initialPicLists }: { initialPicLists: InitialPicLists }) {
  const [picLists, setPicLists] = useState<PicList[]>();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchedPictures, setSearchedPictures] = useState<PicList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const TAGS: string[] = ['ALL', 'dog', 'park', 'girl', 'man'];
  const [tag, setTag] = useState<sortedBy>('ALL');
  const [likes, setLikes] = useState<sortedByLike>('undefined');
  const [typingKeyword, setTypingKeyword] = useState<string>('');

  const { data: session, status } = useSession();
  // // console.log('session in index', session);
  // // console.log('initialPicLists', initialPicLists);
  // // console.log('status', status);

  const changeTagType = (tags: string) => {
    if (tags === 'ALL') {
      setTag(tags);
    }
    if (tags === 'dog') setTag(tags);
    if (tags === 'park') setTag(tags);
    if (tags === 'girl') setTag(tags);
    if (tags === 'man') {
      setTag(tags);
    }

    console.log('태그 눌렀을 때 searchKeyword', searchKeyword);
    // if (tags === 'night') setTag(tags);
    // if (tags === 'sky') setTag(tags);
  };

  // -----------기존의 useQuery
  // const queryClient = useQueryClient();
  // const { isLoading, isError, data } = useQuery<PicList[]>({
  //   queryKey: ['picLists', tag, searchKeyword, likes],
  //   queryFn: (a) => {
  //     // // console.log('sss', a);
  //     return fetchSearchedListByTag(tag, searchKeyword, likes);
  //   }
  // });

  //  ---------------기존의 useQuery

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<any[]>({
    queryKey: ['picLists', tag, searchKeyword, likes],
    // 4. pageParam에 getNextPageParam의 return값이 들어온다.
    queryFn: ({ pageParam }) => {
      // 5. fetchSearchedListByTag가 실행된다.
      return fetchSearchedListByTag(tag, searchKeyword, likes, pageParam);
    },
    initialPageParam: 0,

    // 2. getNextPageParam 이 실행된다.
    // => querySnapShot은 이전에 가지고 있던 데이터들
    getNextPageParam: (lastPage) => {
      // const lastPageParam = lastPage.data.querySnapShot.docs[querySnapShot.docs.length - 1];
      // 3. 현재 내가 가지고있는 마지막 데이터
      // console.log({ lastPage });
      // @ts-ignore
      return lastPage.lastVisible;
    }
  });

  console.log('인덱스의 data', data);

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      // if (!inView || !hasNextPage) return;

      // TODO: !hasNextPage 추가??
      // 1. 초록색바가 보이면 fetchNextPage를 실행한다.
      if (!inView) return;
      console.log('fetchNextPage 실행');
      fetchNextPage();
    }
  });

  return (
    <>
      <StMainContainer>
        <Header />
        <StSearchEngineContainer>
          <SearchEngine
            tag={tag}
            likes={likes}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            typingKeyword={typingKeyword}
            setTypingKeyword={setTypingKeyword}
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
          likes={likes}
          searchKeyword={searchKeyword}
          setLikes={setLikes}
          data={data?.pages.map((page) => page.data).flat()}
        />
      </StMainContainer>

      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'green',
          color: 'white',
          width: '100%',
          height: 50
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </>
  );
}

export default Main;

// 페이지가 서버에서 렌더링될 때 한 번 실행되어 초기 데이터를 가져와 페이지에 주입
export async function getServerSideProps() {
  const sampleCollection = collection(db, 'photos');
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
    // console.log('에러', error);

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
  margin-top: 1.5rem;
  width: 35rem;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
`;

const StTag = styled.li`
  padding: 8px 16px; /* 상하좌우 여백 */
  border: 1px solid #ccc;
  color: #333;
  transition: transform 0.2s, box-shadow 0.3s;
  border-radius: 20px; /* 더 둥근 모서리 */
  background-color: #f9f9f9;
  text-align: center;
  list-style: none; /* 기본 목록 스타일 제거 */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-weight: bold;
    background-color: white;
  }
`;

const StSearchEngineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 4.5rem;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;
