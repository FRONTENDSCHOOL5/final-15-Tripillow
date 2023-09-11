import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutStyle } from 'Styles/Layout';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import userToken from 'Recoil/userToken/userToken';
import isLogin from 'Recoil/isLogin/isLogin';
import accountName from 'Recoil/accountName/accountName';
import BasicHeader from 'Components/common/Header/BasicHeader';
import AlertModal from 'Components/common/Modal/AlertModal';
import useIsWideView from 'Components/SideNav/useIsWideView';

const Setting = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);
  const setName = useSetRecoilState(accountName);
  const setLogin = useSetRecoilState(isLogin);
  const isWideView = useIsWideView();
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [marketingClicked, setMarketingClicked] = useState(true);
  const [followClicked, setFollowClicked] = useState(true);
  const [commentClicked, setCommentClicked] = useState(true);
  const [chatClicked, setChatClicked] = useState(true);

  const handleLogOutModal = () => {
    setLogoutModal(!logoutModal);
  };

  const handleDeleteAccountModal = () => {
    setDeleteAccountModal(!deleteAccountModal);
  };

  const handleCancel = () => {
    setLogoutModal(false);
    setDeleteAccountModal(false);
  };

  const handleSignOut = () => {
    setToken('');
    setName('');
    setLogin(false);
    navigate('/');
  };

  return (
    <Layout $isWideView={isWideView}>
      {!isWideView && <BasicHeader>설정 및 개인정보</BasicHeader>}
      <SectionCommonLayout>
        <TitleCommonLayout>알림 설정</TitleCommonLayout>
        <ContentCommonLayout>
          <p>마케팅 정보 수신 및 알림</p>
          <input
            type='checkbox'
            id='marketing_switch'
            onChange={() => setMarketingClicked(!marketingClicked)}
            checked={marketingClicked}
          />
          <label htmlFor='marketing_switch'>Toggle</label>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <p>팔로우 알림</p>
          <input
            type='checkbox'
            id='follow_switch'
            onChange={() => setFollowClicked(!followClicked)}
            checked={followClicked}
          />
          <label htmlFor='follow_switch'>Toggle</label>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <p>댓글 알림</p>
          <input
            type='checkbox'
            id='comment_switch'
            onChange={() => setCommentClicked(!commentClicked)}
            checked={commentClicked}
          />
          <label htmlFor='comment_switch'>Toggle</label>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <p>채팅 알림</p>
          <input type='checkbox' id='chat_switch' onChange={() => setChatClicked(!chatClicked)} checked={chatClicked} />
          <label htmlFor='chat_switch'>Toggle</label>
        </ContentCommonLayout>
      </SectionCommonLayout>
      <SectionCommonLayout>
        <TitleCommonLayout>약관 및 정책</TitleCommonLayout>
        <ContentCommonLayout>
          <p>이용약관</p>
          <Link to='#none'>약관 보기</Link>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <p>개인정보처리방침</p>
          <Link to='#none'>약관 보기</Link>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <p>마케팅 정보 수신 동의</p>
          <Link to='#none'>약관 보기</Link>
        </ContentCommonLayout>
      </SectionCommonLayout>
      <SectionCommonLayout>
        <TitleCommonLayout>설정</TitleCommonLayout>
        <ContentCommonLayout>
          <button onClick={handleLogOutModal}>로그아웃</button>
        </ContentCommonLayout>
        <ContentCommonLayout>
          <button onClick={handleDeleteAccountModal}>회원탈퇴</button>
        </ContentCommonLayout>
      </SectionCommonLayout>
      {logoutModal && (
        <AlertModal
          txt='정말 로그아웃 하시겠습니까?'
          rightbtn='확인'
          rightClick={handleSignOut}
          leftClick={handleCancel}
        />
      )}
      {deleteAccountModal && (
        <AlertModal txt='정말 탈퇴 하시겠습니까?' rightbtn='확인' rightClick={handleSignOut} leftClick={handleCancel} />
      )}
    </Layout>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  background-color: ${(props) => (props.$isWideView ? '#fff' : '#f2f2f2')};
`;

const SectionCommonLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 33px;
  padding: 15px 16px 15px;
  margin-bottom: 6px;
  background-color: #fff;

  div:last-child {
    margin-bottom: 15px;
  }
`;

const TitleCommonLayout = styled.h2`
  font-size: var(--lg);
  color: var(--dark-gray);
  margin: 10px 0 5px;
`;

const ContentCommonLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }

  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 45px;
    height: 24px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 2.4px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }

  input:checked + label {
    background: var(--primary);
  }

  input:checked + label:after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 30px;
  }

  a {
    font-size: var(--sm);
    text-decoration: underline;
    color: var(--gray);
  }

  button {
    display: block;
    font-size: var(--md);
  }
`;

export default Setting;
