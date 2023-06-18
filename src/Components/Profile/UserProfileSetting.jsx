// import React, { useState } from 'react';
// import styled from 'styled-components';
// import URL from '../../Utils/URL';
// import SignupAPI from '../../Utils/SignupAPI';
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { LayoutStyle } from '../../Styles/Layout';
// import profileImg from '../../Assets/profile-lg.png';
// import ErrorMSG from '../../Styles/ErrorMSG';

// // [참고] https://velog.io/@shin6403/React-Form-Data-%EC%A0%84%EC%86%A1

// const UserProfileSetting = ({ userInfo, setUserInfo, handleInputChange }) => {
//   const [imgURL, setImgURL] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleImageInput = async (e) => {
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);
//     const res = await fetch(URL + '/image/uploadfile', {
//       method: 'POST',
//       body: formData,
//     });
//     const json = await res.json();
//     console.log(json);
//     setImgURL(URL + '/' + json.filename);
//     setUserInfo({ ...userInfo, user: { ...userInfo.user, image: URL + '/' + json.filename } });
//   };

//   const handleSign = async () => {
//     const res = await SignupAPI(userInfo);

//     console.log(userInfo);

//     if (res) {
//       setErrorMessage(res.message);
//       console.log(res);
//       console.log(userInfo);
//     } else {
//       console.log(res);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleSign();
//   };

//   return (
//     <UserSettingLayout>
//       <Title>프로필 설정</Title>
//       <Inform>나중에 언제든지 변경할 수 있습니다.</Inform>
//       <Form onSubmit={handleSubmit}>
//         <ImageLayout>
//           <ImgLabel htmlFor='file-input'>
//             <ProfileImg src={imgURL} />
//           </ImgLabel>
//           <input id='file-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
//         </ImageLayout>
//         <Input
//           label='사용자 이름'
//           type='text'
//           forId='name'
//           placeholder='2~10자 이내여야 합니다.'
//           mb={errorMessage ? '6px' : '16px'}
//           value={userInfo.user.username}
//           name='username'
//           onChange={handleInputChange}
//         ></Input>

//         {errorMessage && userInfo.user.username && <ErrorMSG>{errorMessage}</ErrorMSG>}

//         <Input
//           label='계정 ID'
//           type='text'
//           forId='user-id'
//           placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
//           mb={errorMessage ? '6px' : '16px'}
//           value={userInfo.user.accountname}
//           name='accountname'
//           onChange={handleInputChange}
//         ></Input>
//         {errorMessage === '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' &&
//           errorMessage === '이미 사용중인 계정 ID입니다.' &&
//           userInfo.user.accountname && <ErrorMSG>{errorMessage}</ErrorMSG>}
//         <Input
//           label='소개'
//           type='text'
//           forId='describe'
//           placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
//           mb={errorMessage ? '6px' : '16px'}
//           value={userInfo.user.intro}
//           name='intro'
//           onChange={handleInputChange}
//         ></Input>
//         {errorMessage === '필수 입력사항을 입력해주세요.' && <ErrorMSG>{errorMessage}</ErrorMSG>}
//         <Button
//           type='submit'
//           width='322px'
//           fontSize='14px'
//           margin='10px 0 0 0'
//           padding='13px 0'
//           disabled={!userInfo.user.username || !userInfo.user.accountname || !userInfo.user.intro}
//         >
//           Tripillow 시작하기
//         </Button>
//       </Form>
//     </UserSettingLayout>
//   );
// };

// // 스타일드 컴포넌트 추가

// const UserSettingLayout = styled.div`
//   ${LayoutStyle}
//   padding: 30px 34px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   margin-bottom: 40px;
//   font-size: var(--xxl);
// `;

// const Inform = styled.p`
//   color: var(--dark-gray);
//   font-size: var(--sm);
//   margin-bottom: 30px;
// `;

// const ImageLayout = styled.div`
//   width: 110px;
//   height: 110px;
//   margin: 0 auto 30px;
//   position: relative;
// `;

// const ImgLabel = styled.label`
//   display: block;
//   width: 110px;
//   height: 110px;
//   border-radius: 50%;
//   overflow: hidden;
//   cursor: pointer;
// `;

// const ProfileImg = styled.img`
//   width: 100%;
//   height: 100%;
//   background: url(${profileImg}) 0 0 / cover;
// `;

// // const IconImage = styled.img`
// //   width: 36px;
// //   height: 36px;
// //   position: absolute;
// //   right: 0;
// //   bottom: 0;
// //   background: url(${uploadfile}) 0 0 / cover;
// // `;

// export default UserProfileSetting;
