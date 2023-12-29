import React from 'react';
import styled from 'styled-components';
import { fetchGetPhotoData, fetchTagPhotoData } from '../api/photoFind';
import { GetServerSideProps } from 'next';
import ImgZoom from '@/components/Detail/ImgZoom';
import { FirebasePhotoData } from '@/type/firebaseDataType';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const id = query.id;

  try {
    const pic = await fetchGetPhotoData(id!);
    if (!pic) {
      return { props: { pic: null } };
    }
    // tags에 포함된 데이터 호출
    const searchTagsResult = await fetchTagPhotoData(pic.tags);

    return { props: { pic, searchTagsResult } };
  } catch (error) {
    console.error(error);
    // 에러 처리
    return { props: { error: '데이터 로딩 중 에러 발생' } };
  }
};

type Props = {
  pic: FirebasePhotoData | null; // fetchGetPhotoData에서 반환하는 타입
  searchTagsResult: FirebasePhotoData[] | null; // fetchTagPhotoData에서 반환하는 타입
  error?: string;
};

export default function Detail({ pic, searchTagsResult, error }: Props) {
  if (error) return <div>{error}</div>;

  if (!pic) {
    return <div>사진 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <StContainer>
      <StImgContainer>
        <StImg>
          <ImgZoom src={pic.imgPath} />
        </StImg>
        <div>
          <a download href="ImageDownload">
            다운로드
          </a>
          <div>
            <span>{pic.likes}</span>
          </div>
        </div>
      </StImgContainer>
      <StTags>
        {pic.tags.map((tag, index) => {
          return <p key={tag + index}>{tag}</p>;
        })}
      </StTags>
      <div>
        <h4>관련사진</h4>
        {searchTagsResult?.map((item) => {
          return <Image src={item.imgPath} alt="" width={100} height={100} />;
        })}
      </div>
    </StContainer>
  );
}

const StContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const StImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StImg = styled.div`
  width: 20rem;
`;

const StTags = styled.div`
  display: flex;
`;
