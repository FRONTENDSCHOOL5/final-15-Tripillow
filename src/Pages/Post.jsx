import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { LayoutStyle } from '../Styles/Layout';
import iconImg from '../Assets/icons/upload-file.svg';
import UploadHeader from '../Components/common/Header/UploadHeader';
import Toggle from '../Components/common/Toggle';
import URL from '../Utils/URL';
import x from '../Assets/icons/x.svg';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import ImageUploadAPI from '../Utils/ImageUploadAPI';

export default function Post() {
  const textarea = useRef();
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState([]);
  const token = useRecoilValue(userToken);

  const handleImageInput = async (e) => {
    if (imgURL.length >= 3) return;
    const data = await ImageUploadAPI(e);
    setImgURL((prev) => prev.concat(data.filename));
  };

  const handleSubmit = async () => {
    const images = imgURL.join(', ');
    console.log(images);
    try {
      const response = await fetch(URL + '/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: inputValue,
            image: images,
          },
        }),
      });
      const res = await response.json();
      textarea.current.value = '';
      setImgURL([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleResizeHeight();
  };

  return (
    <PostLayout>
      <UploadHeader disabled={!inputValue} onClick={handleSubmit}>
        업로드
      </UploadHeader>
      <Form>
        <ToggleLayout>
          <ToggleTitle>여행지</ToggleTitle>
          <Toggle leftButton='국내' rightButton='환전' margin='0 0 22px 0'></Toggle>
        </ToggleLayout>
        <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handleInputChange} rows='1'></TextInput>
        {imgURL.map((el, i) => (
          <ImgLayout key={`ImgLayout-${i}`}>
            <Img src={`${URL}/${el}`} key={`Img-${i}`} />
            <ImgDelete key={`ImgDelete-${i}`}></ImgDelete>
          </ImgLayout>
        ))}
        <label htmlFor='img-input'>
          <ImgIcon src={iconImg}></ImgIcon>
        </label>
        <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
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
  width: calc(100% - 28px);
  margin: 0 12px 20px 16px;
  font-size: var(--sm);
  resize: none;
  font: inherit;
  line-height: 1.2em;

  ::placeholder {
    color: var(--gray);
  }
`;

const ImgLayout = styled.div`
  margin: 0 12px 20px 16px;
  position: relative;
`;

const Img = styled.img`
  /* height: 225px; */
  width: 100%;
`;

const ImgDelete = styled.section`
  position: absolute;
  top: 9px;
  right: 9px;
  width: 22px;
  height: 22px;
  background: url(${x}) 0 0 / cover;
`;

const ImgIcon = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
  border-radius: 50%;
  cursor: pointer;
`;

const Form = styled.form``;
