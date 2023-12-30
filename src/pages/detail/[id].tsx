import React from 'react';
import styled from 'styled-components';
import { fetchGetPhotoData, fetchTagPhotoData } from '../api/photoFind';
import { GetServerSideProps } from 'next';
import ImgZoom from '@/components/Detail/ImgZoom';
import { FirebasePhotoData } from '@/type/firebaseDataType';
import Image from 'next/image';
import downloadImage from '../../../utils/downloadImage';

// http://localhost:3000/detail/UOrBkUP_6CgEwDE6tAvvM

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
    <div>
      <StImgContainer>
        <StImg>
          <ImgZoom src={pic.imgPath} />
        </StImg>
        <div>
          <button
            onClick={() => {
              const imageUrl = `${pic.imgPath}`;
              const imageName = '로고_스택오버플로우.png';
              downloadImage(imageUrl, imageName);
            }}
          >
            다운로드
          </button>
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
        {searchTagsResult?.map((item, idx) => {
          return <Image key={idx} src={item.imgPath} alt="" width={500} height={400} />;
        })}
      </div>
    </div>
  );
}

const StImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StImg = styled.div`
  width: 20rem;
`;

const StTags = styled.div`
  display: flex;
  gap: 10px;
`;
