import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import URL from '../../Utils/URL';
import { validateImageFileFormat } from '../../Utils/validate';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import Toggle from '../../Components/common/Toggle';
import x from '../../Assets/icons/x.svg';
import { LayoutStyle } from '../../Styles/Layout';
import iconImg from '../../Assets/icons/upload-file.svg';
import imageCompression from 'browser-image-compression';
import UploadPostAPI from '../../Utils/UploadPostAPI';
import CompressedImageUploadAPI from '../../Utils/CompressedImageUploadAPI';
import PCNavBar from '../../Components/PCNav/PCNavBar';
import useIsDesktop from '../../Components/PCNav/useIsDesktop';

export default function Post() {
  const isPCScreen = useIsDesktop();
  const navigate = useNavigate();
  const textarea = useRef();
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState([]);
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const uploadPost = UploadPostAPI(imgURL, inputValue, isLeftToggle);

  const handleDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');
    const data = await CompressedImageUploadAPI(file);
    if (data) {
      setImgURL((prev) => prev.concat(data.filename));
    }
  };

  const handleImageInput = async (e) => {
    const file = e.target?.files[0];
    if (!file || file.length === 0) {
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      return alert('파일은 10MB를 넘길 수 없습니다.');
    }
    if (imgURL.length >= 3) {
      alert('파일은 3장을 넘길 수 없습니다.');
      return;
    }
    if (!validateImageFileFormat(file.name)) {
      return alert('파일 확장자를 확인해주세요');
    }

    const options = {
      maxSizeMB: 0.9,
      maxWidthOrHeight: 490,
      useWebWorker: true,
    };

    try {
      // 압축 결과
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        handleDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    await uploadPost();
    textarea.current.value = '';
    setImgURL([]);
    navigate('/profile');
  };

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = parseInt(textarea.current.scrollHeight) + 20 + 'px';
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
  display: block;
  width: 100%;
  padding: 0 12px 0 16px;
  box-sizing: border-box;
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
