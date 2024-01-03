import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

// 초기 상태값
const initialSearchKeyword = '';

// Context 생성
export const SearchContext = createContext<any>(null);

type Props = {
  children: React.ReactNode;
};

// Context Provider 컴포넌트
export const SearchProvider: React.FC<any> = ({ children }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(initialSearchKeyword);

  return <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</SearchContext.Provider>;
};

// Custom Hook을 통해 Context 사용
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
