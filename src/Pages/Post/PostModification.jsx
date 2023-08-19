import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import URL from '../../Utils/URL';
import PostDetailAPI from '../../Utils/PostDetailAPI';
import { validateImageFileFormat } from '../../Utils/validate';
import { LayoutStyle } from '../../Styles/Layout';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import Toggle from '../../Components/common/Toggle';
import x from '../../Assets/icons/x.svg';
import iconImg from '../../Assets/icons/upload-file.svg';
import PostModifyAPI from '../../Utils/PostModifyAPI';
import imageCompression from 'browser-image-compression';
import CompressedImageUploadAPI from '../../Utils/CompressedImageUploadAPI';
import { useRecoilValue } from 'recoil';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import Button from '../../Components/common/Button';
import MyPillowings from '../../Components/Home/MyPillowings';

const PostModification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state;
  const isPCScreen = useRecoilValue(isDesktop);
  const [postInput, setPostInput] = useState({
    post: {
      content: '',
      image: '',
    },
  }); //새로 제출할 값
  const [originalPost, setOriginalPost] = useState({}); // 기존값
  const textarea = useRef();
  const [imgURL, setImgURL] = useState([]); // [234, 456]
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const [rightOn, setRightOn] = useState(false);
  const [imgChange, setImgChange] = useState(false);
  const getPostDetail = PostDetailAPI(postId, setOriginalPost);
  const { postModify } = PostModifyAPI(postId, postInput, isLeftToggle);

  useEffect(() => {
    const getDetail = async () => {
      await getPostDetail();
    };
    getDetail();
  }, []);

  useEffect(() => {
    const trimContent = (content) => {
      const match = content.match(/^\[(K|G)\]/);
      if (match) {
        if (match[0] === '[G]') {
          setRightOn(true);
        }
        return content.slice(3);
      }
      return content;
    };

    Object.keys(originalPost).length > 0 &&
      setPostInput({
        post: {
          content: trimContent(originalPost.post.content),
          image: originalPost.post.image,
        },
      });
    setImgChange((prev) => !prev);
  }, [originalPost]);

  useEffect(() => {
    textarea.current.value = postInput.post.content;
    handleResizeHeight();
  }, [postInput]);

  useEffect(() => {
    if (postInput.post.image === '') setImgURL([]);
    else setImgURL(postInput.post.image.split(', '));
  }, [imgChange]);

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
    const image = postInput.post.image === '' ? data.filename : postInput.post.image + `, ${data.filename}`;
    if (data) {
      setPostInput((prev) => ({
        ...prev,
        post: {
          ...prev.post,
          image: image,
        },
      }));
      setImgChange((prev) => !prev);
    }
  };

  const handleImageInput = async (e) => {
    if (imgURL.length >= 3) {
      return alert('파일은 3장을 넘길 수 없습니다.');
    }
    const file = e.target?.files[0];
    if (!file || file.length === 0) {
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      return alert('파일은 10MB를 넘길 수 없습니다.');
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
    await postModify();
    textarea.current.value = '';
    setImgURL([]);
    navigate('/profile');
  };

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPostInput((prev) => ({
      ...prev,
      post: {
        ...prev.post,
        content: value,
      },
    }));
    handleResizeHeight();
  };

  const handleImgClose = (i) => {
    const newImg = [...imgURL.slice(0, i), ...imgURL.slice(i + 1, imgURL.length)].join(', ');

    setPostInput((prev) => ({
      ...prev,
      post: {
        ...prev.post,
        image: newImg,
      },
    }));
    setImgChange((prev) => !prev);
  };

  return (
    <PostLayout $isPCScreen={isPCScreen}>
      {!isPCScreen && (
        <UploadHeader disabled={!postInput.post.content} onClick={handleSubmit}>
          업로드
        </UploadHeader>
      )}
      <ToggleLayout>
        <ToggleTitle>여행지</ToggleTitle>
        <Toggle
          leftButton='국내'
          rightButton='해외'
          margin='0 0 22px 0'
          setIsLeftToggle={setIsLeftToggle}
          rightOn={rightOn}
          setRightOn={setRightOn}
        ></Toggle>
      </ToggleLayout>
      <form>
        {isPCScreen && (
          <Button
            disabled={!postInput.post.content}
            onClick={handleSubmit}
            width='90px'
            fontSize='14px'
            padding='7.75px'
          >
            업로드
          </Button>
        )}
        {isPCScreen && (
          <>
            <PCImgUpload htmlFor='img-input'>+ 여행사진 추가하기</PCImgUpload>
            <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
          </>
        )}
        <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handleInputChange} rows='1'></TextInput>
        {imgURL[0] !== '' &&
          imgURL.map((el, i) => (
            <ImgLayout key={`ImgLayout-${i}`}>
              <Img src={`${URL}/${el}`} key={`Img-${i}`} />
              <ImgDelete type='button' key={`ImgDelete-${i}`} onClick={() => handleImgClose(i)}></ImgDelete>
            </ImgLayout>
          ))}
        {!isPCScreen && (
          <>
            <label htmlFor='img-input'>
              <ImgIcon src={iconImg}></ImgIcon>
            </label>
            <input id='img-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
          </>
        )}
      </form>
      {isPCScreen && <MyPillowings $on={isPCScreen} />}
    </PostLayout>
  );
};

const PostLayout = styled.div`
  ${LayoutStyle};
  position: relative;

  form {
    & > button {
      position: absolute;
      top: 80px;
      right: 0;
    }
  }
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

export default PostModification;
