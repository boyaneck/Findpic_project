import { fetchSearchedListByTag } from '@/pages/api/picLists';
import { SearchEngineProps } from '@/type/searchEnginePropsType';
import React, { useState } from 'react';
import { styled } from 'styled-components';

const SearchEngine: React.FC<SearchEngineProps> = ({
  searchByKeyword,
  typeKeyword,
  searchKeyword,
  setSearchKeyword,
  likes,
  tag
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim() !== '') {
      await fetchSearchedListByTag(tag, searchKeyword, likes);
    }
  };
  return (
    // <StSearchEngineWrapper
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     fetchSearchedListByTag(tag, searchKeyword, likes);
    //   }}
    // >
    <StSearchEngineWrapper onSubmit={handleSubmit}>
      <StSearchIcon src="./search-icon.png" />
      <StSearchEngineBar
        placeholder="Search"
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          typeKeyword(e);
        }}
      />
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
