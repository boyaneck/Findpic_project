import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { db } from '@/common/firebase_RK';

type FormProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  photos: {}[];
  setPhotos: React.Dispatch<React.SetStateAction<any[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchFrom({ input, setInput, setPhotos, setIsLoading }: FormProps) {
  const testItems = ['rose', 'night', 'christmas', 'present', 'dog', 'winter'];
  const [page, setPage] = useState<number>(2);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const checkImageExists = async (url: string) => {
    try {
      const response = await fetch(url);
      return response.status; // 이미지가 존재하면 true, 아니면 false
    } catch (error) {
      console.error('Error checking image existence:', error);
      return false; // 에러가 발생하면 이미지가 없다고 가정
    }
  };

  // DB 데이터를 받아서 넣어둔 배열을 인자로 넣음
  const isExist = async (fbData: any) => {
    const proceed = await Promise.all(
      fbData.map(async (item: any) => {
        const result = await checkImageExists(item.imgPath);
        if (result === 200) return item;
        else return null;
      })
    );

    return proceed.filter((el) => el !== null);
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const photosRef = collection(db, 'photos');
    const q = query(photosRef, where('tags', 'array-contains', input), limit(10));
    const result = await getDocs(q);
    const resultArr: any = [];
    result.forEach((el) => {
      resultArr.push(el.data());
    });

    const proceedResult = await isExist(resultArr);
    setPhotos(proceedResult);
    setIsLoading(false);
  };

  // Infinite Scroll FUNCTIONS
  // 스크롤 양이 끝까지 내려가면 API로 이미지 추가 호출
  const loadMoreImages = async () => {
    try {
      setIsLoading(true);
      const photosRef = collection(db, 'photos');
      const q = query(photosRef, where('tags', 'array-contains', input), limit(4));
      const result = await getDocs(q);

      // 다음 페이지
      const lastvisible = result.docs[result.docs.length - page];
      const next: any = query(photosRef, startAfter(lastvisible), limit(4));
      const nextResult = await getDocs(next);
      const resultArr: any = [];
      nextResult.forEach((el) => {
        resultArr.push(el.data());
      });
      const proceedResult = await isExist(resultArr);
      setPhotos((prev) => [...prev, ...proceedResult]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (err) {
      return err;
    }
  };

  // 스크롤 제어 - 스크롤양 + 창의 높이가 전체 body의 높이보다 커지면 이미지 추가 호출 실행
  const onScrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreImages();
    } else {
      return;
    }
  };

  useEffect(() => {
    // DB를 업데이트 할 때 아래 두 개의 함수를 주석 해제
    // getUnsplash();
    // getPixabay();
    window.addEventListener('scroll', onScrollHandler); // 스크롤 이벤트

    return () => {
      window.removeEventListener('scroll', onScrollHandler); // 스크롤 이벤트 제거
    };
  });

  return (
    <StSearchContainer>
      <StSearchInputWrapper onSubmit={handleSubmit}>
        <StSearchInputEl onChange={handleChange} value={input} />
        <StTagSection>
          <StTagLists>
            {testItems.map((item, i) => {
              return <StTags key={i}># {item}</StTags>;
            })}
          </StTagLists>
        </StTagSection>
      </StSearchInputWrapper>
    </StSearchContainer>
  );
}

const StSearchContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #eee;
  margin: auto;
  color: black;
`;

const StSearchInputWrapper = styled.form`
  width: 100%;
  padding: 3rem 9rem;
`;

const StSearchInputEl = styled.input.attrs({
  placeholder: '찾고 싶은 것을 입력하세요!'
})`
  width: 100%;
  padding: 0.6rem 0.9rem;
  background-color: #d9d9d950;
  border: 1px solid black;
  border-radius: 50px;
  font-size: 1.25rem;
  color: black;

  &::placeholder {
    font-size: 1rem;
  }
`;

const StTagSection = styled.section`
  width: 100%;
  padding: 1rem 0;
`;

const StTagLists = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  & li {
    list-style: none;
  }
`;

const StTags = styled.li`
  width: fit-content;
  padding: 0.45rem 1rem;
  border: 1px solid black;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #ff7267;
    color: white;
  }
`;
