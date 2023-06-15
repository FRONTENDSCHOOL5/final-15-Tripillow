import React from 'react';
import styled from 'styled-components';
import { Layout } from '../Styles/Layout';
import Comment from './Comment';
import BasicHeader from './common/Header/BasicHeader';
import PostComment from './common/PostComment';
import HomePostLayout from './HomePost/HomePostLayout';

export default function UploadedPost() {
  return (
    <Layout>
      <BasicHeader></BasicHeader>
      <HomePostLayout isEditable></HomePostLayout>
      <CommentLayout>
        <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
        <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      </CommentLayout>
      <PostComment></PostComment>
    </Layout>
  );
}

const CommentLayout = styled.section`
  border-top: 1px solid var(--light-gray);
  padding-top: 20px;
`;
