import React from 'react';
import styled from 'styled-components';
import SkeletonItem from '../../Styles/SkeletonItem';

const UserSkeleton = () => {
  return (
    <SkeletonUserLayout>
      <SkeletonProfileImage />
      <div>
        <SkeletonUserName />
        <SkeletonId />
      </div>
    </SkeletonUserLayout>
  );
};

const SkeletonUserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SkeletonProfileImage = styled(SkeletonItem)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SkeletonUserName = styled(SkeletonItem)`
  width: 136px;
  height: 18px;
  margin-bottom: 2px;
`;

const SkeletonId = styled(SkeletonItem)`
  width: 107px;
  height: 14px;
`;

export default UserSkeleton;
