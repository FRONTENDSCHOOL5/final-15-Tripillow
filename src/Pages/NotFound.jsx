import React from 'react';
import { Layout } from '../Styles/Layout';
import ErrorContents from '../Components/common/ErrorContents';
import NotFoundImg from '../Assets/404.png';

const NotFound = () => {
  return (
    <Layout>
      <ErrorContents image={NotFoundImg} alt='404 이미지' buttonName='이전 페이지' navigate={-1}>
        페이지를 찾을 수 없습니다. :&#40;
      </ErrorContents>
    </Layout>
  );
};

export default NotFound;
