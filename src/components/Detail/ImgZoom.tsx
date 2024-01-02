import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';

type Props = {
  src: string;
};

const StImageZoomContainer = styled.div<{ iszoomed: boolean }>`
  transition: transform 0.3s;
  cursor: zoom-in;

  ${(props) => props.iszoomed && 'transform: scale(2); cursor: zoom-out;'}
`;

const StImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

// const StSkeletonImage = styled(Skeleton.Image)`
//   max-width: 100%;
//   height: auto;
//   display: block;
//   margin: 0 auto;
//   > svg {
//     width: 100%;
//     height: 100%;
//     background-color: white !important;
//   }
// `;

export default function ImgZoom({ src }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, [isLoading]);

  const toggleZoom = () => {
    setIsZoomed((prevIsZoomed) => !prevIsZoomed);
  };

  return (
    <StImageZoomContainer iszoomed={isZoomed} onClick={toggleZoom}>
      <StImage src={src} alt="" width="" height="" />
      {/* {isLoading && <DetailSkeleton />} */}
      {/* {isLoading ? <StSkeletonImage active /> : <StImage src={src} alt="" width="" height="" />} */}
    </StImageZoomContainer>
  );
}
