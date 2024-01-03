import React from 'react';
import styled, { keyframes } from 'styled-components';

const CardAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CardSkeleton = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  animation: ${CardAnimation} 1s infinite;
`;

export default function Skeleton() {
  return <CardSkeleton />;
}
