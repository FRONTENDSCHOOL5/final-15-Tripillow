import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { LayoutStyle } from '../Styles/Layout';
import CircleButton from '../Components/common/CircleButton';
import imgFile from '../Assets/icons/upload-file.svg';
import UploadHeader from '../Components/common/Header/UploadHeader';
import Toggle from '../Components/common/Toggle';

export default function UploadPost() {
  const [inputValue, setInputValue] = useState('');
  const textarea = useRef();

  const handelResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  const handelInputChange = (e) => {
    setInputValue(e.target.value);
    handelResizeHeight();
  };

  return (
    <PostLayout>
      <UploadHeader disabled={!inputValue}>업로드</UploadHeader>
      <Form>
        <ToggleLayout>
          <ToggleTitle>여행지</ToggleTitle>
          <Toggle leftButton='국내' rightButton='환전' margin='0 0 22px 0'></Toggle>
          <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handelInputChange}></TextInput>
          {/* <ImgInput></ImgInput> */}
          <CircleButton bgUrl={imgFile} right='16px' bottom='16px'></CircleButton>
        </ToggleLayout>
      </Form>
    </PostLayout>
  );
}
const PostLayout = styled.div`
  ${LayoutStyle};
  position: relative;
`;

const ToggleLayout = styled.section`
  margin: 10px 12px 0 16px;
`;
const ToggleTitle = styled.h1`
  color: var(--dark-gray);
  font-size: var(--xs);
  margin-bottom: 10px;
`;
const TextInput = styled.textarea`
  border: none;
  width: 100%;
  min-height: 30px;
  font-size: var(--sm);
  resize: none;
  font: inherit;

  ::placeholder {
    color: var(--gray);
  }
`;
// const ImgInput = styled.input``;
const Form = styled.form``;
