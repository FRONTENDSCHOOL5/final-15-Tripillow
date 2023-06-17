import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../Styles/Layout';
import styled from 'styled-components';

const Landing = () => {
  return (
    <Layout>
      <Test to='/login'>이메일로 로그인하기</Test>
    </Layout>
  );
};

const Test = styled(Link)`
  display: block;
  margin-top: 300px;
  text-align: center;
`;

export default Landing;
