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

  const getUnsplash = async () => {
    const inputs = await addData(); // 데이터 처리 이후 inputs 생성
    console.log('넘기기 전 inputs', inputs);
    const tagResult = await detectionTags(inputs);
    console.log(tagResult);
    await setFinal(tagResult);
  };

  const addData = async () => {
    try {
      let changed: fetchedItem[] = []; // changed 변수를 빈 배열로 초기화

      for (let i = 2; i < 3; i++) {
        const resp = await axios.get(
          `https://api.unsplash.com/photos?page=${i}&client_id=${envConfig.unsplash.apiKey}`
        );
        const unsplashData = await resp.data;

        const processedData = unsplashData.map((item: fetchedItem) => {
          return {
            id: nanoid(),
            likes: 0,
            updated: new Date().toISOString(),
            imgPath: item.urls.raw,
            from: 'unsplash'
          };
        });

        changed = [...changed, ...processedData];
      }

      setData(changed); // 데이터 업데이트 후

      const inputs = changed.map((item: Partial<fetchedItem>) => {
        return {
          data: {
            image: {
              url: item.imgPath
            }
          }
        };
      });

      console.log('Inputs:', inputs);

      return inputs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const detectionTags = async (inputs: any) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '2a58702bb8e948e5aeb2244a08ba8cbe';
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
      console.log('Tag Detection Result:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setDB = async (processed: fetchedItem[]) => {
    try {
      processed.forEach((data: fetchedItem) => {
        addDoc(collection(db, 'datas'), data);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setFinal = async (Tagresult: any) => {
    // 기존 data와 Tagresult의 outputs를 합치는 과정
    const newData = data.map((item: fetchedItem, i: number) => {
      return {
        ...item,
        tags: Tagresult.outputs[i]?.data.concepts === undefined ? '' : Tagresult.outputs[i]?.data.concepts
      };
    });
    console.log('new D', newData);
    await setDB(newData);
  };

  // useEffect(() => {
  //   getUnsplash();
  // }, []);

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
