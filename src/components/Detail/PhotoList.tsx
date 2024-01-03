//@ts-nocheck
import React, { useEffect } from 'react';
import { CardSkeleton } from '../skeleton/Skeleton';
import Image from 'next/image';
import { fetchPhotoDatabyPage } from '@/pages/api/photoFind';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { styled } from 'styled-components';

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
    status,
    isLoading
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

  console.log(queryPage);

  if (error) console.log('error = ', error);
  return (
    <StImgContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {queryPage?.pages.map((pageData) =>
        pageData?.proceed?.map(({ imgPath, id }) => (
          <Link href={`/detail/${id}`} key={id}>
            <StRelatedImage key={id} src={imgPath} alt="" loading="lazy" width={500} height={400} />
          </Link>
        ))
      )}
      {/* 스켈레톤 UI 또는 로딩 인디케이터 표시 */}
      {isFetchingNextPage &&
        queryPage?.pages.map((pageData) => pageData?.proceed?.map(({ imgPath, id }) => <CardSkeleton key={id} />))}
    </StImgContainer>
  );
}

const StImgContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  margin: auto;
  grid-gap: 0.5rem;
`;

const StRelatedImage = styled(Image)`
  width: 27.5rem;
  height: 25rem;
  object-fit: cover;
  margin: 0.25rem;
`;
