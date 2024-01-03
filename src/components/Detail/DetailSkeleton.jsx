import React from 'react';
import { styled, keyframes } from 'styled-components';

const CardAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const CardSkeleton = styled.div`
  width: 500px;
  height: 400px;
  background-color: gray;
  animation: ${CardAnimation} 1s infinite;
`;

export default function DetailSkeleton() {
  return;
}
