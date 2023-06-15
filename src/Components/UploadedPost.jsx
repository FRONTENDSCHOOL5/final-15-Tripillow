import React from 'react';
import Comment from '../Comment';
import PostComment from './PostComment';
import HomePostLayout from '../HomePost/HomePostLayout';
import { Layout } from '../../Styles/Layout';

export default function UploadedPost() {
  return (
    <Layout>
      <HomePostLayout></HomePostLayout>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      <PostComment></PostComment>
    </Layout>
  );
}
