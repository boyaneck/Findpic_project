import React from 'react';
import { Skeleton } from 'antd';

const DetailSkeleton = () => {
  return (
    <>
      <Skeleton title={true} active={true} paragraph={{ rows: 8 }}>
        <p>hi</p>
      </Skeleton>
    </>
  );
};

export default Skeleton;
