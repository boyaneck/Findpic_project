//@ts-nocheck
import React, { useEffect } from 'react';
import Image from 'next/image';
import { fetchPhotoDatabyPage } from '@/pages/api/photoFind';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  searchTags: string[];
}

export default function PhotoList({ searchTags }: Props) {
  const {
    data: queryPage,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetchPhotoDatabyPage(pageParam, searchTags, 4),
    getNextPageParam: (lastPage) => {
      return lastPage?.lastVisible;
    }
  });

  // 스크롤 이벤트 핸들러

  // 스크롤 이벤트 리스너 추가 및 제거
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  if (error) console.log('error = ', error);
  return (
    <div>
      {queryPage?.pages.map((pageData) =>
        pageData?.data?.map(({ imgPath, id }) => <Image key={id} src={imgPath} alt="" width={500} height={400} />)
      )}
      {/* 스켈레톤 UI 또는 로딩 인디케이터 표시 */}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
