import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import PostDetailAPI from '../Utils/PostDetailAPI';
import { LayoutStyle } from '../Styles/Layout';
import UploadHeader from '../Components/common/Header/UploadHeader';
import Toggle from '../Components/common/Toggle';
import URL from '../Utils/URL';
import x from '../Assets/icons/x.svg';
import iconImg from '../Assets/icons/upload-file.svg';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import ImageUploadAPI from '../Utils/ImageUploadAPI';
import { validateImageFile } from '../Utils/validate';

const PostModification = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);
  const location = useLocation();
  const postId = location.state;
  const [postInput, setPostInput] = useState({
    post: {
      content: '',
      image: '',
    },
  }); //새로 제출할 값
  const [postDetail, setPostDetail] = useState({}); // 기존값
  const textarea = useRef();
  const [imgURL, setImgURL] = useState([]); // [234, 456]
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const [rightOn, setRightOn] = useState(false);
  const getPostDetail = PostDetailAPI(postId, setPostDetail);

  useEffect(() => {
    const getDetail = async () => {
      await getPostDetail();
    };
    getDetail();
  }, []);

  useEffect(() => {
    textarea.current.value = postInput.post.content;
    handleResizeHeight();
  }, [postInput.post.content]);

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

    Object.keys(postDetail).length > 0 &&
      setPostInput({
        post: {
          content: trimContent(postDetail.post.content),
          image: postDetail.post.image,
        },
      });
  }, [postDetail]);

  useEffect(() => {
    setImgURL(postInput.post.image.split(', '));
  }, [postInput]);

  const handleImageInput = async (e) => {
    if (imgURL.length >= 3 || e.target.files.length === 0) return;
    if (!validateImageFile(e.target.files[0].name)) return console.error('ERROR: 파일 확장자');
    const data = await ImageUploadAPI(e);
    const image = postInput.post.image === '' ? data.filename : postInput.post.image + `, ${data.filename}`;
    if (data) {
      setPostInput((prev) => ({
        ...prev,
        post: {
          ...prev.post,
          image: image,
        },
      }));
    }
    console.log('{', imgURL, '}');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...postInput,
          post: {
            ...postInput.post,
            content: isLeftToggle ? `[K]${postInput.post.content}` : `[G]${postInput.post.content}`,
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
  };

  return (
    <PostLayout>
      <UploadHeader disabled={!postInput.post.content} onClick={handleSubmit}>
        업로드
      </UploadHeader>
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
        <TextInput placeholder='게시글 입력하기...' ref={textarea} onChange={handleInputChange} rows='1'></TextInput>
        {imgURL[0] !== '' &&
          imgURL.map((el, i) => (
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
};

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

export default PostModification;
