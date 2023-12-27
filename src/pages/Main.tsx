import Header from "@/components/main/Header";
import MainPicLists from "@/components/main/MainPicLists";
import SearchEngine from "@/components/main/SearchEngine";
import React from "react";
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
