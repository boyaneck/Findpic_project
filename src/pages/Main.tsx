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
}

const Main = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [picLists, setPicLists] = useState<PicList[]>([]);
  const [searchedPictures, setSearchedPictures] = useState<PicList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const TAGS: string[] = ['전체', 'dog', 'park', 'girl', 'man'];
  const typeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    console.log(e.target.value);
  };

  const SearchByTag = (index: number, event: React.MouseEvent<HTMLLIElement>) => {
    const selectedTag = TAGS[index];

    // 각 태그에 따른 동작 수행
    switch (index) {
      case 0:
        // "전체" 태그 선택 시 모든 이미지 보여주기
        setIsSearching(false);
        setSearchedPictures([]);
        break;
      default:
        // 나머지 태그 선택 시 선택된 태그와 일치하는 이미지만 보여주기
        const searchedResultsByTag = picLists.filter((pic) => pic.tags.includes(selectedTag));
        setIsSearching(true);
        setSearchedPictures(searchedResultsByTag);
        break;
    }
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
      <StTagContainer>
        {TAGS.map((tag: string, index: number) => (
          <StTag key={index} onClick={(e) => SearchByTag(index, e)}>
            {tag}
          </StTag>
        ))}
      </StTagContainer>
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
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
