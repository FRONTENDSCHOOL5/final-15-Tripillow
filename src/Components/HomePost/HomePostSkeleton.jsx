import styled from 'styled-components';
import SkeletonItem from '../../Styles/SkeletonItem';

const HomePostSkeleton = () => {
  return (
    <SkeletonLayout>
      <SkeletonUserLayout>
        <SkeletonProfileImage />
        <div>
          <SkeletonUserName />
          <SkeletonId />
        </div>
      </SkeletonUserLayout>
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
