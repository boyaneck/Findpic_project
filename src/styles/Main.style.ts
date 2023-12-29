import styled from 'styled-components';

export const FILTER_BUTTON = styled.button`
  margin-left: 10px;
  background-color: white;
  padding: 5px;
  border-radius: 7px;
  margin: 20px 20px;
  &:hover {
    cursor: pointer;
    background-color: #ccc;
  }
`;
export const FILTER_BUTTON_WRAPPER = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PICS_WRAPPER = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EACH_PIC = styled.div`
  width: 50vh;
  height: 50vh;
`;
