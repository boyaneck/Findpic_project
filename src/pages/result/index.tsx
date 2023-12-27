import SearchFrom from '@/components/searchForm/SearchForm';
import SearchedList from '@/components/searchedList/SearchedList';
import React, { useState } from 'react';
import styled from 'styled-components';

const ResultPageWrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

export default function Result() {
  const [input, setInput] = useState<string>('');
  const [photos, setPhotos] = useState<[]>([]);

  console.log(photos);
  return (
    <ResultPageWrapper>
      <SearchFrom input={input} setInput={setInput} photos={photos} setPhotos={setPhotos} />
      <SearchedList input={input} photos={photos} />
    </ResultPageWrapper>
  );
}
