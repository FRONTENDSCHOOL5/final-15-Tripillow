import React from 'react';
import { Layout } from '../Styles/Layout';
import Comment from './Comment';
import BasicHeader from './common/Header/BasicHeader';
import PostComment from './common/PostComment';
import HomePostLayout from './HomePost/HomePostLayout';

export default function UploadedPost() {
  return (
    <Layout>
      <BasicHeader></BasicHeader>
      <HomePostLayout></HomePostLayout>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <PostComment></PostComment>
    </Layout>
  );
}
