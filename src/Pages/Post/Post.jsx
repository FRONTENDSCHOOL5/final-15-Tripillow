import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import throttle from 'lodash.throttle';
import { validateImageFileFormat } from 'Utils/validate';
import UploadHeader from 'Components/common/Header/UploadHeader';
import Toggle from 'Components/common/Toggle';
import x from 'Assets/icons/x.svg';
import { LayoutStyle } from 'Styles/Layout';
import iconImg from 'Assets/icons/upload-file.svg';
import UploadPostAPI from 'Api/Post/UploadPostAPI';
import Button from 'Components/common/Button';
import MyPillowings from 'Components/Home/MyPillowings';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';
import { uploadFile } from 'Utils/uploadFile';

const Post = () => {
  const navigate = useNavigate();
  const textarea = useRef();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const [inputValue, setInputValue] = useState('');
  const [imgURL, setImgURL] = useState([]);
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const uploadPost = UploadPostAPI(imgURL, inputValue, isLeftToggle);

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

    await uploadFile(e, (imageUrl) => {
      setImgURL((prev) => [...prev, imageUrl]);
    });
  };

  const handleSubmit = async () => {
    await uploadPost();
    if (textarea.current) textarea.current.value = '';
    setImgURL([]);
    navigate('/profile');
  };

  const throttledHandleSubmit = throttle(handleSubmit, 3000, {
    leading: true,
    trailing: false,
  });

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
    <>
      <MetaTag
        title='Tripillow 게시물 업로드'
        description='여행 사진과 여행 경험을 공유하기위해 게시물을 업로드해보세요'
        url='https://tripillow.netlify.app/post'
      />
      <PostLayout $isWideView={isWideView}>
        {!isWideView && (
          <UploadHeader disabled={!inputValue} onClick={throttledHandleSubmit}>
            업로드
          </UploadHeader>
        )}
        <ToggleLayout>
          <Toggle leftButton='국내' rightButton='해외' setIsLeftToggle={setIsLeftToggle} margin='0 0 22px 0'></Toggle>
        </ToggleLayout>
        <form>
          {isWideView && (
            <>
              <PCImgUpload htmlFor='img-input'>+ 여행사진 추가하기</PCImgUpload>
              <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
            </>
          )}
          <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handleInputChange} rows='1'></TextInput>
          {imgURL.map((el, i) => (
            <ImgLayout key={`ImgLayout-${i}`}>
              <Img src={el} key={`Img-${i}`} />
              <ImgDelete
                $isWideView={isWideView}
                type='button'
                key={`ImgDelete-${i}`}
                onClick={() => handleImgClose(i)}
              ></ImgDelete>
            </ImgLayout>
          ))}
          {!isWideView && (
            <>
              <label htmlFor='img-input'>
                <ImgIcon src={iconImg}></ImgIcon>
              </label>
              <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
            </>
          )}
          {isWideView && (
            <Button
              disabled={!inputValue}
              onClick={throttledHandleSubmit}
              width='90px'
              fontSize='14px'
              padding='7.75px'
              style={{ position: 'absolute', top: '55px' }}
            >
              업로드
            </Button>
          )}
        </form>
        {isPCScreen && <MyPillowings $on={isPCScreen} />}
      </PostLayout>
    </>
  );
};

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

const PCImgUpload = styled.label`
  margin-left: 16px;
  margin-bottom: 20px;
  display: inline-block;
  padding: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  font-size: var(--xs);
  color: var(--dark-gray);
  cursor: pointer;
`;

export default Post;
