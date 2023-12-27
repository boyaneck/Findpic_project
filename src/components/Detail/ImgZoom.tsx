import React, { useState } from 'react';
import styled from 'styled-components';

type ImgZoomProps = {
  src: string;
};

const StImageZoomContainer = styled.div<{ isZoomed: boolean }>`
  transition: transform 0.3s;
  cursor: pointer;

  ${(props) => props.isZoomed && 'transform: scale(2);'}
`;

const StImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

export default function ImgZoom({ src }: ImgZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed((prevIsZoomed) => !prevIsZoomed);
  };

  return (
    <StImageZoomContainer isZoomed={isZoomed} onClick={toggleZoom}>
      <StImage src={src} alt="" width={300} height={300} />
    </StImageZoomContainer>
  );
}
