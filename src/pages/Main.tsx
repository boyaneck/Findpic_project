import Header from '@/components/main/Header';
import MainPicLists from '@/components/main/MainPicLists';
import SearchEngine from '@/components/main/SearchEngine';
import React from 'react';
import { styled } from 'styled-components';
const Main = () => {
  return (
    <StMainContainer>
      <Header />
      <SearchEngine />
      <MainPicLists />
    </StMainContainer>
  );
};
export default Main;

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
