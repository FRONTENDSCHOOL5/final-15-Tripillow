import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import URL from '../../Utils/URL';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import UserInfoAPI from '../../Utils/MyInfoAPI';
import EditProfileAPI from '../../Utils/EditProfileAPI';
import AccountValidAPI from '../../Utils/AccountValidAPI';
import Input from '../../Components/common/Input';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import { LayoutStyle } from '../../Styles/Layout';
import ErrorMSG from '../../Styles/ErrorMSG';
import profileImg from '../../Assets/profile-lg.png';
import uploadfile from '../../Assets/icons/upload-file.svg';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import Button from '../../Components/common/Button';

const UserProfileSetting = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const [imgURL, setImgURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const updateErrorMessage = (data) => {
    setErrorMessage(data);
  };
  const [data, setData] = useState({});
  const updateData = (data) => {
    setData(data);
  };
  const [text, setText] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });
  const [account, setAccount] = useState({ user: { accountname: text.user.accountname } });
  const { getUserData } = UserInfoAPI(updateData, null);
  const getAccountValidAPI = AccountValidAPI(account, updateErrorMessage);

  useEffect(() => {
    const handleFetch = async () => {
      await getUserData();
    };

    handleFetch();
  }, []);

  useEffect(() => {
    if (data.username && data.accountname && data.intro && data.image) {
      setText({
        user: {
          username: data.username,
          accountname: data.accountname,
          intro: data.intro,
          image: data.image,
        },
      });
    }
  }, [data, setText]);

  useEffect(() => {
    setAccount({ user: { accountname: text.user.accountname } });
  }, [text]);

  const handleAccountValid = async () => {
    const res = await getAccountValidAPI();
  };

  const handleImageInput = async (e) => {
    const res = await ImageUploadAPI(e);
    setImgURL(URL + '/' + res.filename);
    setText({
      ...text,
      user: {
        ...text.user,
        image: URL + '/' + res.filename,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setText((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const { handleEditProfileAPI } = EditProfileAPI({ ...text });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = handleEditProfileAPI();
    if (res) {
      navigate('/profile');
    }
  };

  return (
    <UserSettingLayout $isPCScreen={isPCScreen}>
      {!isPCScreen && (
        <UploadHeader
          onClick={handleSubmit}
          type='submit'
          disabled={errorMessage && errorMessage !== '사용 가능한 계정ID 입니다.'}
        >
          저장
        </UploadHeader>
      )}
      <Form>
        <ImageLayout>
          <ImgLabel htmlFor='file-input'>
            <ProfileImg src={imgURL ? imgURL : data.image ? data.image : profileImg} />
          </ImgLabel>
          <input id='file-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
        </ImageLayout>
        <Input
          label='사용자 이름'
          type='text'
          forId='name'
          placeholder='2~10자 이내여야 합니다.'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.username}
          name='username'
          onChange={handleInputChange}
        ></Input>
        <Input
          label='계정 ID'
          type='text'
          forId='user-id'
          placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.accountname}
          name='accountname'
          onChange={handleInputChange}
          onBlur={handleAccountValid}
        ></Input>
        {errorMessage === '사용 가능한 계정ID 입니다.' && text.user.accountname && (
          <ErrorMSG errorColor={errorMessage !== '사용 가능한 계정ID 입니다.'}>{errorMessage}</ErrorMSG>
        )}
        {errorMessage !== '사용 가능한 계정ID 입니다.' && text.user.accountname && (
          <ErrorMSG errorColor={errorMessage !== '사용 가능한 계정ID 입니다.'}>{errorMessage}</ErrorMSG>
        )}
        <Input
          label='소개'
          type='text'
          forId='describe'
          placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.intro}
          name='intro'
          onChange={handleInputChange}
        ></Input>
        <Button
          onClick={handleSubmit}
          type='submit'
          disabled={errorMessage && errorMessage !== '사용 가능한 계정ID 입니다.'}
          width='90px'
          fontSize='14px'
          padding='7.75px'
        >
          저장
        </Button>
      </Form>
    </UserSettingLayout>
  );
};

const UserSettingLayout = styled.div`
  ${LayoutStyle}
  padding: 78px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 14px;
    align-self: flex-end;
  }
`;

const ImageLayout = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  position: relative;
`;

const ImgLabel = styled.label`
  display: block;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    background: url(${uploadfile}) 0 0 / cover;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export default UserProfileSetting;
