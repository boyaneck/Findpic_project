import Header from '@/components/main/Header';
import { db, storage } from '@/common/firebase.my';
import React from 'react';
import SearchEngine from '@/components/main/SearchEngine';
import MainPicLists from '@/components/main/MainPicLists';

const Main = () => {
  const storage1 = storage;
  //   const db1 = db;
  //   console.log('firestore fetching :', db);
  return (
    <div>
      <Header />
      <SearchEngine />
      <MainPicLists />
    </div>
  );
};

export default Main;
