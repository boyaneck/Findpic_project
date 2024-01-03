import { Inter } from 'next/font/google';
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
import { useSearchContext } from '@/context/keyword';
import { SkeletonTheme } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';

const inter = Inter({ subsets: ['latin'] });

// function Main<initialPicLists>() {
function Main({ initialPicLists }: { initialPicLists: InitialPicLists }) {
  const [picLists, setPicLists] = useState<PicList[]>();

  // const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchedPictures, setSearchedPictures] = useState<PicList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const TAGS: string[] = ['ALL', 'dog', 'park', 'girl', 'man'];
  const [tag, setTag] = useState<sortedBy>('ALL');
  const [likes, setLikes] = useState<sortedByLike>('undefined');
  const [typingKeyword, setTypingKeyword] = useState<string>('');
  const { searchKeyword, setSearchKeyword } = useSearchContext();
  const { data: session, status } = useSession();

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
  };

  type paramType = {
    tag: string;
    searchKeyword: string;
    pageParam: number;
    likes: string;
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<any[]>({
    queryKey: ['picLists', tag, searchKeyword, likes],
    // 4. pageParam에 getNextPageParam의 return값이 들어온다.
    queryFn: ({ pageParam }): any => {
      // 5. fetchSearchedListByTag가 실행된다.
      return fetchSearchedListByTag(tag, searchKeyword, likes, pageParam);
    },
    initialPageParam: 0,

    // 2. getNextPageParam 이 실행된다.
    // => querySnapShot은 이전에 가지고 있던 데이터들
    getNextPageParam: (lastPage) => {
      // 3. 현재 내가 가지고있는 마지막 데이터

      // @ts-ignore
      return lastPage.lastVisible;
    }
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      // 1. 초록색바가 보이면 fetchNextPage를 실행한다.
      if (!inView) return;

      fetchNextPage();
    }
  });

  return (
    <>
      <StMainContainer>
        {/* <Header /> */}
        <StSearchEngineContainer>
          <SearchEngine tag={tag} likes={likes} typingKeyword={typingKeyword} setTypingKeyword={setTypingKeyword} />
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
          data={data?.pages.map((page: any) => page.data).flat()}
          isFetchingNextPage={isFetchingNextPage}
        />
      </StMainContainer>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          height: 50
        }}
        ref={ref}
      >
        {/* Trigger to Fetch Here */}
      </div>
    </>
  );
}

export default Main;

// 페이지가 서버에서 렌더링될 때 한 번 실행되어 초기 데이터를 가져와 페이지에 주입
export async function getServerSideProps() {
  const sampleCollection = collection(db, 'datas');
  const q = query(sampleCollection);

  try {
    const Snapshot = await getDocs(q);
    const pictureList = Snapshot.docs.map((doc) => doc.data() as PicList);

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
  margin-top: 0.9rem;
  width: 35rem;
  display: flex;
  justify-content: center;
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
