import SearchFrom from '@/components/searchForm/SetDBTest';
import SearchedList from '@/components/searchedList/UtilTest';
import React, { useState } from 'react';
import styled from 'styled-components';

const ResultPageWrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

export default function Result() {
  const [input, setInput] = useState<string>('');
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ResultPageWrapper>
      <SearchFrom input={input} setInput={setInput} photos={photos} setPhotos={setPhotos} setIsLoading={setIsLoading} />
      <SearchedList input={input} photos={photos} setPhotos={setPhotos} isLoading={isLoading} />
    </ResultPageWrapper>
  );
}
