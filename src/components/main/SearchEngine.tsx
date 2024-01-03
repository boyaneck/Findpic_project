import { fetchSearchedListByTag } from '@/pages/api/picLists';
import { SearchEngineProps } from '@/type/searchEnginePropsType';
import React, { useState } from 'react';
import { useSearchContext } from '@/context/keyword';
import { styled } from 'styled-components';

const SearchEngine: React.FC<SearchEngineProps> = ({
  // searchKeyword,
  // setSearchKeyword,
  likes,
  tag,
  typingKeyword,
  setTypingKeyword
}) => {
  const { searchKeyword, setSearchKeyword } = useSearchContext();
  const handleSubmit = async (e: React.FormEvent, typingKeyword: string) => {
    e.preventDefault();
    let pageParam = 0;
    setSearchKeyword(typingKeyword);
    fetchSearchedListByTag(tag, typingKeyword, likes, pageParam);
    setTypingKeyword('');
  };

  return (
    <StSearchEngineWrapper onSubmit={(e) => handleSubmit(e, typingKeyword)}>
      <StSearchIcon src="./search-icon.png" />
      <StSearchEngineBar
        placeholder="Search"
        value={typingKeyword}
        onChange={(e) => {
          setTypingKeyword(e.target.value);
        }}
      />
    </StSearchEngineWrapper>
  );
};

export default SearchEngine;

const StSearchEngineWrapper = styled.form`
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StSearchEngineBar = styled.input`
  width: 35rem;
  height: 3rem;
  border: none;
  border-radius: 3rem;
  padding-left: 3.7rem;
  font-size: 1rem;
  background-color: #f7f3f3;
  transition: box-shadow 0.3s, border-color 0.3s, color 0.3s; /* 변화에 트랜지션을 적용합니다. */
  color: #333; /* 기본 텍스트 색상 */

  /* 포커스 상태일 때 스타일 변경 */
  &:focus {
    outline: none; /* 기본 포커스 스타일 제거 */
    border: 2px solid #ccc; /* 포커스 시 테두리 색상 변경 */
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3); /* 포커스 시 그림자 효과 추가 */
    background-color: white;
  }
`;

const StSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  width: 1.2rem;
  z-index: 10000;
`;
