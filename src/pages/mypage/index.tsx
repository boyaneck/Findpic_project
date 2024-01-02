import { db } from '@/common/firebase_RK';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export default function MyPage() {
  const [example, setExample] = useState<any[]>([]);
  const propLength = example?.length;
  const [position, setPosition] = useState<number>(0);

  const getDB = useCallback(async (tag: string) => {
    const PhotoRef = collection(db, 'photos');

    let q = query(PhotoRef, where('tags', 'array-contains', tag));
    const querySnapshot = await getDocs(q);

    querySnapshot.docs.forEach((item) => setExample((prev) => [item.data(), ...prev]));
  }, []);

  const moveLeft = () => {
    setPosition((prev) => prev - 35);
  };

  const moveRight = () => {
    setPosition((prev) => prev + 35);
  };

  useEffect(() => {
    getDB('cat');
    // console.log('나 실행중');
  }, []);

  return (
    <StPageContainer>
      <StSectionTitle>❤️ 좋아요 목록</StSectionTitle>
      <StLikedContainer>
        <StLikedSliderContainer $length={propLength}>
          {example?.map((photo, i) => {
            return (
              <StLikedPhotoBox key={i} $currentPosition={position}>
                <StImageStyle src={photo?.imgPath} width={1400} height={1400} alt="i" priority />
              </StLikedPhotoBox>
            );
          })}
        </StLikedSliderContainer>
        <StArrow $position={'left'} onClick={moveLeft}>
          ⬅️
        </StArrow>
        <StArrow $position={'right'} onClick={moveRight}>
          ➡️
        </StArrow>
      </StLikedContainer>
    </StPageContainer>
  );
}

const StPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

const StSectionTitle = styled.h3`
  width: 100%;
  font-weight: 600;
  margin-block: 2rem;
`;

const StLikedContainer = styled.section`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const StLikedSliderContainer = styled.section<any>`
  width: ${(props) => `${props.$length}vw`};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StLikedPhotoBox = styled.div<any>`
  width: 100vw;
  height: 500px;
  transition: all 1s ease;
  transform: ${(props) => `translateX(${props.$currentPosition}vw)`};
`;

const StImageStyle = styled(Image)`
  width: 35vw;
  height: 500px;
  object-fit: cover;
`;

const StArrow = styled.div<any>`
  width: fit-content;
  height: fit-content;
  font-size: 2rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  cursor: pointer;
  ${(props) => {
    if (props.$position === 'left') {
      return css`
        left: 2%;
      `;
    } else {
      return css`
        right: 2%;
      `;
    }
  }}
`;
