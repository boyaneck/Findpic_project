import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useCustomQuery<T, TError extends Error = Error>(
  queryOptions: UseQueryOptions<T, TError>
): [T | undefined, boolean] {
  let { isLoading, isError, error, data, refetch } = useQuery<T, TError>(queryOptions);

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsLoadingSkeleton(isLoading);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    // error 처리
    if (isError) {
      console.log('isError ', error);
    }
  }, [isError, error]);

  return [data, isLoadingSkeleton];
}
