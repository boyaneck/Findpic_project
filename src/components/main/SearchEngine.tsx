import { fetchSearchedListByTag } from '@/pages/api/picLists';
import { SearchEngineProps } from '@/type/searchEnginePropsType';
import React, { useState } from 'react';
import { styled } from 'styled-components';

const SearchEngine: React.FC<SearchEngineProps> = ({
  searchKeyword,
  setSearchKeyword,
  likes,
  tag,
  typingKeyword,
  setTypingKeyword
}) => {
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchKeyword.trim() !== '') {
  //     await fetchSearchedListByTag(tag, searchKeyword, likes);
  //   }
  // };
  // const [typingKeyword, setTypingKeyword] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent, typingKeyword: string) => {
    e.preventDefault();
    // if (searchKeyword.trim() !== '') {
    //   await fetchSearchedListByTag(tag, searchKeyword, likes);
    // }
    setSearchKeyword(typingKeyword);
    console.log('searchKeyword now:', searchKeyword);
    fetchSearchedListByTag(tag, searchKeyword, likes);
  };

  return (
    // <StSearchEngineWrapper
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     fetchSearchedListByTag(tag, searchKeyword, likes);
    //   }}
    // >
    <StSearchEngineWrapper onSubmit={(e) => handleSubmit(e, typingKeyword)}>
      <StSearchIcon src="./search-icon.png" />
      <StSearchEngineBar
        placeholder="Search"
        value={typingKeyword}
        onChange={(e) => {
          // const typingKeyword = e.target.value;
          // handleSubmit(e, typingKeyword:string);
          // setSearchKeyword(e.target.value);
          // console.log('searchKeyword', searchKeyword);
          // typeKeyword(e);
          setTypingKeyword(e.target.value);
        }}
      />
      searchKeyword:{searchKeyword}TypingKeyword:{typingKeyword}
    </StSearchEngineWrapper>
  );
};

export default SearchEngine;

const StSearchEngineWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StSearchEngineBar = styled.input`
  width: 35rem;
  height: 3rem;
  border-radius: 3rem;
  border: 1px solid black;
  padding-left: 3.7rem;
  font-size: 1rem;
`;

const StSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  width: 1.2rem;
  z-index: 10000;
`;
