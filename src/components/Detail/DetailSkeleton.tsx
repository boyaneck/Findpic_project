import React from 'react';
import { Skeleton } from 'antd';

const DetailSkeleton = () => {
  return (
    <>
      <Skeleton.Image active />
      <Skeleton loading={true} title active paragraph={{ rows: 8 }}>
        <p>hi</p>
      </Skeleton>
    </>
  );
};

export default DetailSkeleton;
