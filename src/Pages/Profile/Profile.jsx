import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutStyle } from 'Styles/Layout';
import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import AlertTop from 'Components/common/Modal/AlertTop';
import ProfileMain from 'Components/Profile/ProfileMain';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';

const Profile = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const pathArr = pathname.split('/');
  const isWideView = useIsWideView();
  const [isDeleted, setIsDeleted] = useState(state?.isDeleted);
  const [isModified, setIsModified] = useState(state?.isModified);

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setIsDeleted(false), 2300);
    }
    if (isModified) {
      setTimeout(() => setIsModified(false), 2300);
    }
  }, [isDeleted, isModified]);

  useEffect(() => {
    if (state) {
      navigate(pathname, { replace: true });
    }
  }, [state, pathname, navigate]);

  return (
    <>
      <MetaTag
        title='Tripillow 프로필'
        description='프로필에서 판매중인 상품과 여행 게시물을 확인해보세요'
        url='https://tripillow.netlify.app/profile'
      />
      <Layout $isWideView={isWideView}>
        {!isWideView && (
          <BasicHeader
            btn1='설정 및 개인정보'
            btn2='로그아웃'
            txt='정말 로그아웃 하시겠습니까?'
            rightbtn='로그아웃'
            subject={pathArr.length > 2 ? `${pathArr[2]}의 프로필` : '나의 프로필'}
          />
        )}
        {(isModified || isDeleted) && (
          <AlertTop isWideView={isWideView} isError={isDeleted}>
            {isModified ? '수정되었습니다.' : '삭제되었습니다.'}
          </AlertTop>
        )}
        <ProfileMain setIsDeleted={setIsDeleted} setIsModified={setIsModified} />
        {isWideView || <Navbar />}
      </Layout>
    </>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  background-color:${(props) => (props.$isWideView ? '#fff' : '#f2f2f2')};
`;

export default Profile;
