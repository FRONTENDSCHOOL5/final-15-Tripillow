import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import URL from '../../Utils/URL';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import { validateImageFile } from '../../Utils/validate';
import userToken from '../../Recoil/userToken/userToken';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import Toggle from '../../Components/common/Toggle';
import x from '../../Assets/icons/x.svg';
import { LayoutStyle } from '../../Styles/Layout';
import iconImg from '../../Assets/icons/upload-file.svg';

export default function Post() {
  const navigate = useNavigate();
  const textarea = useRef();
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState([]);
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const token = useRecoilValue(userToken);

  const handleImageInput = async (e) => {
    if (imgURL.length >= 3 || e.target.files.length === 0) return;
    if (!validateImageFile(e.target.files[0].name)) return console.log('ERROR: 파일 확장자');
    const data = await ImageUploadAPI(e);
    if (data) {
      setImgURL((prev) => prev.concat(data.filename));
    }
  };

  const handleSubmit = async () => {
    const images = imgURL.join(', ');
    try {
      const response = await fetch(URL + '/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: isLeftToggle ? `[K]${inputValue}` : `[G]${inputValue}`,
            image: images,
          },
        }),
      });
      const res = await response.json();
      textarea.current.value = '';
      setImgURL([]);
      navigate('/profile');
      return res;
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

  const handleImgClose = (i) => {
    setImgURL([...imgURL.slice(0, i), ...imgURL.slice(i + 1, imgURL.length)]);
  };

  return (
    <PostLayout>
      <UploadHeader disabled={!inputValue} onClick={handleSubmit}>
        업로드
      </UploadHeader>
      <ToggleLayout>
        <Toggle leftButton='국내' rightButton='해외' setIsLeftToggle={setIsLeftToggle} margin='0 0 22px 0'></Toggle>
      </ToggleLayout>
      <form>
        <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handleInputChange} rows='1'></TextInput>
        {imgURL.map((el, i) => (
          <ImgLayout key={`ImgLayout-${i}`}>
            <Img src={`${URL}/${el}`} key={`Img-${i}`} />
            <ImgDelete type='button' key={`ImgDelete-${i}`} onClick={() => handleImgClose(i)}></ImgDelete>
          </ImgLayout>
        ))}
        <label htmlFor='img-input'>
          <ImgIcon src={iconImg}></ImgIcon>
        </label>
        <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
      </form>
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

const TextInput = styled.textarea`
  border: none;
  width: calc(100% - 28px);
  margin: 0 12px 20px 16px;
  font-size: var(--sm);
  resize: none;
  font: inherit;
  line-height: 1.2em;
  white-space: pre-wrap;

  ::placeholder {
    color: var(--gray);
  }
`;

const ImgLayout = styled.div`
  margin: 0 12px 20px 16px;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
`;

const ImgDelete = styled.button`
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
