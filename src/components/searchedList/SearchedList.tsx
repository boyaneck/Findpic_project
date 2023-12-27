import { db } from '@/common/firebase_RK';
import axios from 'axios';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 100%;
  background-color: #54aaf5;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
`;

const ListCard = styled.div`
  border: 1px solid black;
  border-radius: 9px;
  position: relative;
  cursor: pointer;
`;

const CardHover = styled.div`
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

const HoverWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HoverUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  position: absolute;
  bottom: 12%;
  left: 3%;
`;

const HoverUserIcon = styled.div`
  width: 65px;
  height: 50px;
  background-color: yellow;
  border-radius: 50%;
`;

const HoverUserName = styled.div`
  width: 100%;
  font-weight: 600;
`;

const HoverTagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2%;
  left: 4%;
  gap: 0.5rem;
`;

const HoverTags = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
`;

const TagEl = styled.li`
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

const ImageEl = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
`;

type ListProps = {
  input: string;
  photos: {
    id: string;
    urls: { raw: string };
    createdAt?: string;
    likes: number;
    user?: { name: string; bio: string };
    tags: { title: string }[];
  }[];
};

export default function SearchedList({ input, photos }: ListProps) {
  const changeData = async () => {
    const photoRef = doc(db, 'photo', 'photos');
  };

  return (
    <ListContainer>
      {photos?.map((item) => {
        return (
          <ListCard key={item.id}>
            <ImageEl width={1000} height={1000} src={`${item.urls.raw}`} alt="test2" />
            <CardHover>
              <HoverWrapper>
                <HoverUserInfo>
                  <HoverUserIcon></HoverUserIcon>
                  <HoverUserName>{item.user?.name}</HoverUserName>
                </HoverUserInfo>
                <HoverTagBox>
                  <HoverTags>
                    {item.tags.map((tag) => (
                      <TagEl key={tag.title}># {tag.title}</TagEl>
                    ))}
                  </HoverTags>
                </HoverTagBox>
              </HoverWrapper>
            </CardHover>
          </ListCard>
        );
      })}
    </ListContainer>
  );
}
