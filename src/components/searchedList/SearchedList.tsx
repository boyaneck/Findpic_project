import { db } from '@/common/firebase_RK';
import axios from 'axios';
import { Firestore, addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import envConfig from '../../../config';
import { nanoid } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';

type ListProps = {
  input: string;
  photos: {
    id: string;
    urls: { raw: string };
    createdAt?: string;
    likes: number;
    user?: { name: string; bio: string };
    tags: { title: string }[];
    links: { download: string; download_location: string };
  }[];
};

type fetchedItem = {
  id: string;
  originId: string | number;
  urls: { raw: string };
  imgPath: string;
  tags: [];
  likes: number;
  userId?: string;
  from: string;
  updatedAt: string;
};

export default function SearchedList({ input, photos }: ListProps) {
  const [data, setData] = useState<any>([]);

  // 이미지 fetch
  const getUnsplash = async () => {
    const inputs = await addData();
    console.log('data', data);
    console.log('inputs', inputs);

    // 받아 온 이미지를 순회하며 각 이미지에 해당하는 tag 생성 후 배열 형태로 반환
    const tagsArr = await detectionTags(inputs);
    const outputs = await tagsArr.outputs;

    // 기존 데이터에 tags 추가
    await setFinal(outputs);
    setDB(data);
  };

  // const setDB = (processed: fetchedItem[]) => {
  //   const ref = doc(db, 'photo');
  //   processed?.forEach(async (data: fetchedItem) => {
  //     console.log(data);
  //     await addDoc(ref, data);
  //   });
  // };

  const addData = async () => {
    // 한 페이지(10개)의 데이터 fetch
    for (let i = 1; i < 2; i++) {
      const resp = await axios.get(`https://api.unsplash.com/photos?page=${i}&client_id=${envConfig.unsplash.apiKey}`);
      const unsplashData = await resp.data;

      // 이미지 data 잘 왔나 확인
      console.log('unsplashData', unsplashData);

      // 우리가 필요한 객체로 데이터 가공
      const changed = await unsplashData.map((item: fetchedItem) => {
        // 가공 단계
        return { id: nanoid(), likes: 0, updated: new Date().toISOString(), imgPath: item.urls.raw, from: 'unsplash' };
      });

      // state에 가공한 데이터 저장
      setData((prev: any) => [...changed, ...prev]);
    }
    console.log('input 전 data', data);

    // AI에 보낼 데이터 생성
    const inputs = await data.map((item: Partial<fetchedItem>) => {
      return {
        data: {
          image: {
            url: item.imgPath
          }
        }
      };
    });

    console.log('input 후 data', data);

    return inputs;
  };

  const detectionTags = async (inputs: any) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'b2d95d00d6b1411dbd444b7bd025c1b7';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'general-image-recognition';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [...inputs]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT
      },
      body: raw
    };

    try {
      const resp = await fetch(
        'https://api.clarifai.com/v2/models/' + MODEL_ID + '/versions/' + MODEL_VERSION_ID + '/outputs',
        requestOptions
      );
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setDB = async (processed: fetchedItem[]) => {
    try {
      processed.forEach(async (data: fetchedItem) => {
        await addDoc(collection(db, 'datas'), data);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setFinal = async (Tagresult: any) => {
    setData((prev: fetchedItem[]) =>
      prev.map((item: fetchedItem, i: number) => {
        return { ...item, tags: Tagresult[i]?.data.concepts };
      })
    );
    console.log('finaldata', data);
  };

  useEffect(() => {
    getUnsplash();
  }, []);

  return (
    <StListContainer>
      {photos?.map((item) => {
        return (
          <StListCard key={item.id}>
            <StImageEl width={1000} height={1000} src={`${item.urls.raw}`} alt="test2" />
            <StCardHover>
              <StHoverWrapper>
                <StHoverUserInfo>
                  <StHoverUserIcon></StHoverUserIcon>
                  <StHoverUserName>{item.user?.name}</StHoverUserName>
                </StHoverUserInfo>
                <StHoverTagBox>
                  <StHoverTags>
                    {item.tags.map((tag) => (
                      <StTagEl key={tag.title}># {tag.title}</StTagEl>
                    ))}
                  </StHoverTags>
                </StHoverTagBox>
              </StHoverWrapper>
            </StCardHover>
          </StListCard>
        );
      })}
    </StListContainer>
  );
}

const StListContainer = styled.div`
  width: 100%;
  background-color: #54aaf5;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
`;

const StListCard = styled.div`
  border: 1px solid black;
  border-radius: 9px;
  position: relative;
  cursor: pointer;
`;

const StCardHover = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d1d1d75;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  border-radius: 9px;
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

const StHoverWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StHoverUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  position: absolute;
  bottom: 12%;
  left: 3%;
`;

const StHoverUserIcon = styled.div`
  width: 65px;
  height: 50px;
  background-color: yellow;
  border-radius: 50%;
`;

const StHoverUserName = styled.div`
  width: 100%;
  font-weight: 600;
`;

const StHoverTagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2%;
  left: 4%;
  gap: 0.5rem;
`;

const StHoverTags = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
`;

const StTagEl = styled.li`
  width: 40px;
  text-align: center;
  border: 1px solid #eeeeee50;
  border-radius: 30px;
  padding: 0.2rem;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.8;
  font-weight: 600;
  transition: width 0.2s ease;
  padding: 0.3rem 0.2rem;

  &:hover {
    background-color: white;
    color: black;
    width: 100px;
  }
`;

const StImageEl = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
`;
