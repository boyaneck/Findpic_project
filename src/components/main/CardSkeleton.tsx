import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
const Card_skeleton = styled.div`
  display: flex;
  width: 350px;
  height: 450px;
 flex-direction:column;
  gap: 1rem
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  justify-content: flex-end; /* 아이템들을 오른쪽 끝으로 정렬합니다. */
`;
const Left_col = styled.div`
  margin-right: 1rem;
`;

const Right_col = styled.div`
  flex: 1;
`;

const CardSkeleton = ({ cards }: { cards: any }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div key={i}>
        <Card_skeleton key={i}>
          <Left_col>
            <Skeleton circle width={50} height={50} style={{ marginLeft: '17.5rem', marginTop: '1.5rem' }} />
          </Left_col>
          <Right_col>
            <div style={{ marginTop: '11rem', marginLeft: '10px', marginRight: '10px' }}>
              <Skeleton circle width={40} height={40} style={{ margin: '15px' }} />
              <Skeleton count={4} style={{ marginBottom: '.6rem' }} />
            </div>
          </Right_col>
        </Card_skeleton>
      </div>
    ));
};

export default CardSkeleton;
