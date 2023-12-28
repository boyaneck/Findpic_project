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
  const TAGS: string[] = ['전체', '# dog', '# park', '# girl', '# man'];

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
      <StTagContainer>
        {TAGS.map((tag: string, index: number) => (
          <StTag key={index}>{tag}</StTag>
        ))}
      </StTagContainer>
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
