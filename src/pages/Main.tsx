import Header from '@/components/main/Header';
import MainPicLists from '@/components/main/MainPicLists';
import SearchEngine from '@/components/main/SearchEngine';
import React from 'react';
import { styled } from 'styled-components';
import { db } from '@/common/firebase_hm';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface PicList {
  id: string;
  imgPath: string;
  likes: number;
  originID: string;
  tags: string[];
  writerID: string;
  // 필요한 다른 속성들을 추가할 수 있습니다.
}

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [picLists, setPicLists] = useState<PicList[]>([]);
  const [searchedPictures, setSearchedPictures] = useState<PicList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const typeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const sampleCollection = collection(db, 'findpicLists');
        const Snapshot = await getDocs(sampleCollection);
        const responseData = Snapshot.docs.map((doc) => doc.data());
        console.log('responseData in searchEngine', responseData);
        setPicLists(responseData as PicList[]);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetch();
  }, []);

  const searchByKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const searchedResults = picLists.filter((pic, i) => {
      return pic.tags.some((tag) => tag.includes(searchKeyword));
    });
    // validationCheck();
    setSearchedPictures(searchedResults);
    console.log('searchedResults', searchedResults);
  };

  return (
    <StMainContainer>
      <Header />
      <SearchEngine
        searchByKeyword={searchByKeyword}
        typeKeyword={typeKeyword}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <MainPicLists
        searchedPictures={searchedPictures}
        setSearchedPictures={setSearchedPictures}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
      />
    </StMainContainer>
  );
};
export default Main;

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
