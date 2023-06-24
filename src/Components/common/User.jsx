import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import more from '../../Assets/icons/s-icon-more-vertical.svg';
import Button from './Button';

const User = (props) => {
  const setIsModalOn = props.setIsModalOn;
  const handleOnClick = () => {
    setIsModalOn((prev) => !prev);
  };

  const url = props.userImg?.split('/') || 'null';

  const highlightKeyword = (text, keyword) => {
    const startIndex = text.indexOf(keyword);
    const endIndex = startIndex + keyword?.length;
    const leftSide = text.slice(0, startIndex);
    const rightSide = text.slice(endIndex);
    return { leftSide, rightSide };
  };

  const { leftSide: leftSideUser, rightSide: rightSideUser } = highlightKeyword(props.username, props.keyword);
  const { leftSide: leftSideAccount, rightSide: rightSideAccount } = highlightKeyword(props.accountname, props.keyword);

  return (
    <UserLayout margin={props.margin}>
      <Link to={`/profile/${props.accountname}`}>
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
          />
        </UserImgLayout>
      </Link>
      <UserContentsLayout>
        {props.search ? (
          props.username.includes(props.keyword) && props.accountname.includes(props.keyword) ? (
            <div>
              <UserTitle>
                {leftSideUser}
                <Span>{props.keyword}</Span>
                {rightSideUser}
              </UserTitle>
              <UserContent>
                @{leftSideAccount}
                <Span>{props.keyword}</Span>
                {rightSideAccount}
              </UserContent>
            </div>
          ) : props.username.includes(props.keyword) ? (
            <div>
              <UserTitle>
                {leftSideUser}
                <Span>{props.keyword}</Span>
                {rightSideUser}
              </UserTitle>
              <UserContent>{props.content}</UserContent>
            </div>
          ) : (
            <div>
              <UserTitle>{props.username}</UserTitle>
              <UserContent>
                @{leftSideAccount}
                <Span>{props.keyword}</Span>
                {rightSideAccount}
              </UserContent>
            </div>
          )
        ) : (
          <div>
            <UserTitle>{props.username}</UserTitle>
            <UserContent>{props.content}</UserContent>
          </div>
        )}

        {props.moreBtn && <MoreBtn type='button' onClick={handleOnClick} />}
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
  cursor: pointer;
  margin: ${(props) => props.margin};
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

const Span = styled.span`
  color: var(--primary);
`;

export default User;
