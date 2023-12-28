import React, { useState } from 'react';
import { styled } from 'styled-components';

interface SearchEngineProps {
  searchByKeyword: (e: React.FormEvent) => void;
  typeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchEngine: React.FC<SearchEngineProps> = ({
  searchByKeyword,
  typeKeyword,
  searchKeyword,
  setSearchKeyword
}) => {
  return (
    <StSearchEngineContainer>
      <StSearchEngineWrapper
        onSubmit={(e) => {
          searchByKeyword(e);
        }}
      >
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
    </StSearchEngineContainer>
  );
};

export default SearchEngine;

const StSearchEngineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightyellow;
  margin-top: 4.5rem;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;

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
