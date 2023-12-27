import Header from '@/components/main/Header';
import React from 'react';
import SearchEngine from '@/components/main/SearchEngine';
import MainPicLists from '@/components/main/MainPicLists';

const Main = () => {
  return (
    <div>
      <Header />
      <SearchEngine />
      <MainPicLists />
    </div>
  );
};

export default Main;
