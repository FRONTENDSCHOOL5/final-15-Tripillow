import React from 'react';
import styled from 'styled-components';
import TopNavBar from './TopNavBar';
import Comment from '../Comment';
import PostComment from './PostComment';

export default function UploadedPost() {
  return (
    <UploadedLayout>
      <TopNavBar></TopNavBar>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <PostComment></PostComment>
    </UploadedLayout>
  );
}

const UploadedLayout = styled.div`
  max-width: 390px;
`;
