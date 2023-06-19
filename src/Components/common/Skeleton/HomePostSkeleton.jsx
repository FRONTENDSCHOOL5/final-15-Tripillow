import styled from 'styled-components';
import SkeletonItem from '../../../Styles/SkeletonItem';
import UserSkeleton from './common/UserSkeleton';

const HomePostSkeleton = () => {
  return (
    <SkeletonLayout>
      <UserSkeleton />
      <SkeletonPostImage />
      <SkeletonInteraction />
      <SkeletonArticle />
      <SkeletonDate />
    </SkeletonLayout>
  );
};

const SkeletonLayout = styled.div`
  padding: 14px 12px 20px 16px;
`;

const SkeletonPostImage = styled(SkeletonItem)`
  width: calc(100% + 28px);
  height: 270px;
  margin: 4px -12px 6px -16px;
`;

const SkeletonInteraction = styled(SkeletonItem)`
  width: 96px;
  height: 15px;
  margin: 12px 0;
`;

const SkeletonArticle = styled(SkeletonItem)`
  width: 358px;
  height: 51px;
  margin-bottom: 13px;
`;

const SkeletonDate = styled(SkeletonItem)`
  width: 80px;
  height: 12px;
`;

export default HomePostSkeleton;
