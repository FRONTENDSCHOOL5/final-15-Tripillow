import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from 'Assets/profile-sm.png';
import more from 'Assets/icons/s-icon-more-vertical.svg';
import Button from 'Components/common/Button';

const User = (props) => {
  const setIsModalOn = props.setIsModalOn;
  const handleOnClick = () => {
    setIsModalOn((prev) => !prev);
  };
  const url = props.userImg?.split('/') || 'null';
  const linkRef = useRef();

  const handleClick = (event) => {
    if (event.key === 'Enter' && !props.moreBtn) linkRef.current.click();
  };

  const highlightKeyword = (text, keyword) => {
    const startIndex = text?.indexOf(keyword);
    const endIndex = startIndex + keyword?.length;
    const leftSide = text?.slice(0, startIndex);
    const rightSide = text?.slice(endIndex);
    return { leftSide, rightSide };
  };

  const handleImageError = (e) => {
    e.target.src = profileSm;
  };

  const { leftSide: leftSideUser, rightSide: rightSideUser } = highlightKeyword(props.username, props.keyword);
  const { leftSide: leftSideAccount, rightSide: rightSideAccount } = highlightKeyword(props.accountname, props.keyword);

  return (
    <UserLayout onKeyDown={handleClick} margin={props.margin} tabIndex={props.moreBtn ? -1 : 0}>
      <Link
        ref={linkRef}
        tabIndex={props.moreBtn ? 0 : -1}
        to={`/profile/${props.accountname}`}
        onClick={() => props.setIsSearch && props.setIsSearch(false)}
        aria-label={`${props.accountname} 프로필로 이동`}
      >
        <div>
          <UserImgLayout>
            <UserImg
              src={
                url[url.length - 1] === 'null' ||
                url[url.length - 1] === 'undefined' ||
                (url[0] !== 'data:image' && url[0] !== 'https:')
                  ? profileSm
                  : props.userImg
              }
              alt={props.username}
              onError={handleImageError}
            />
          </UserImgLayout>
        </div>
      </Link>
      <UserContentsLayout>
        <Link
          tabIndex={props.moreBtn ? 0 : -1}
          to={`/profile/${props.accountname}`}
          onClick={() => props.setIsSearch && props.setIsSearch(false)}
          aria-label={`${props.accountname} 프로필로 이동`}
        >
          {props.search ? (
            props?.username.includes(props.keyword) && props.accountname.includes(props.keyword) ? (
              <div>
                <UserTitle>
                  {leftSideUser}
                  <HighLighted>{props.keyword}</HighLighted>
                  {rightSideUser}
                </UserTitle>
                <UserContent>
                  @{leftSideAccount}
                  <HighLighted>{props.keyword}</HighLighted>
                  {rightSideAccount}
                </UserContent>
              </div>
            ) : props?.username.includes(props.keyword) ? (
              <div>
                <UserTitle>
                  {leftSideUser}
                  <HighLighted>{props.keyword}</HighLighted>
                  {rightSideUser}
                </UserTitle>
                <UserContent>{props.content}</UserContent>
              </div>
            ) : (
              <div>
                <UserTitle>{props?.username}</UserTitle>
                <UserContent>
                  @{leftSideAccount}
                  <HighLighted>{props.keyword}</HighLighted>
                  {rightSideAccount}
                </UserContent>
              </div>
            )
          ) : (
            <div>
              <UserTitle>{props?.username}</UserTitle>
              <UserContent>{props.content}</UserContent>
            </div>
          )}
        </Link>

        {props.moreBtn && <MoreBtn type='button' onClick={handleOnClick} aria-label='게시글 설정 더보기' />}
        {props.followers && (
          <Button width='56px' fontSize='var(--xs)' border='none' padding='5.75px'>
            팔로우
          </Button>
        )}
      </UserContentsLayout>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: ${(props) => props.margin};
  overflow: hidden;
`;
const UserImgLayout = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserTitle = styled.h3`
  font-size: var(--sm);
  margin-bottom: 2px;
`;

const UserContent = styled.span`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const UserContentsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MoreBtn = styled.button`
  width: 18px;
  height: 18px;
  margin-right: 3px;
  background-image: url(${more});
`;

const HighLighted = styled.span`
  color: var(--primary);
`;

export default User;
