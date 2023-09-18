import React from 'react';
import styled from 'styled-components';
import SkeletonItem from 'Styles/SkeletonItem';

const PCProfileSkeleton = () => {
  return (
    <PCProfileLayout>
      <PCProfileImg />
      <PCProfileSentenceLayout>
        <PCProfileSentence />
        <PCProfileSentence />
        <PCProfileSentence />
        <PCProfileSentence />
      </PCProfileSentenceLayout>
    </PCProfileLayout>
  );
};

const PCProfileLayout = styled.div`
  display: flex;
  gap: 25px;
  padding: 30px 12px 26px 16px;
  margin-bottom: 23px;
`;

const PCProfileImg = styled(SkeletonItem)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const PCProfileSentenceLayout = styled.div`
  width: 100%;
`;

const PCProfileSentence = styled(SkeletonItem)`
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
`;

export default PCProfileSkeleton;
