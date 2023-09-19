import React from 'react';
import styled from 'styled-components';
import SkeletonItem from 'Styles/SkeletonItem';
import { useRecoilValue } from 'recoil';
import { UserProductLayout } from 'Components/Profile/ProfileMain';
import ProductItemSkeleton from 'Components/common/Skeleton/ProductItemSkeleton';
import HomePostSkeleton from 'Components/common/Skeleton/HomePostSkeleton';
import ProfileView from 'Components/Profile/ProfileView';
import PCProfileSkeleton from './PCProfileSkeleton';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isTab from 'Recoil/isTab/isTab';

const ProfileSkeleton = ({ userAccountname }) => {
  const isWideView = useRecoilValue(isDesktop);
  const isTablet = useRecoilValue(isTab);
  return isWideView || isTablet ? (
    <>
      <PCProfileSkeleton />
      <UserProductLayout>
        <h2>판매 중인 상품</h2>
        <ProductItemSkeleton />
      </UserProductLayout>
      <ProfileView />
      <article>
        <HomePostSkeleton />
      </article>
    </>
  ) : (
    <>
      <ProfileSkeletonLayout>
        <ProfileSkeletonItem mb='6px' />
        <ProfileTextSkeleton mb='6px' />
        <ProfileTextSkeleton mb='16px' />
        <ProfileTextSkeleton mb='24px' />
        {!userAccountname ? (
          <>
            <ProfileButtonSkeleton />
            <ProfileButtonSkeleton />
          </>
        ) : (
          <ProfileButtonSkeleton />
        )}
      </ProfileSkeletonLayout>
      <UserProductLayout>
        <h2>판매 중인 상품</h2>
        <ProductItemSkeleton />
      </UserProductLayout>
      <ProfileView />
      <article>
        <HomePostSkeleton />
      </article>
    </>
  );
};

const ProfileSkeletonLayout = styled.div`
  margin: 0 auto;
  padding: 30px 0 26px;
  text-align: center;
  background-color: #fff;
`;

const ProfileSkeletonItem = styled(SkeletonItem)`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const ProfileTextSkeleton = styled(SkeletonItem)`
  margin: 0 auto;
  width: 120px;
  height: 12px;
  border-radius: 20px;
  margin-bottom: ${(props) => props.mb || '16px'};
`;

const ProfileButtonSkeleton = styled(SkeletonItem)`
  display: inline-block;
  margin: 0 auto;
  width: 100px;
  height: 36px;
  border-radius: 44px;
`;

export default ProfileSkeleton;
