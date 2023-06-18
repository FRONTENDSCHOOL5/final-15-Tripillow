import React from 'react';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import { Layout } from '../../Styles/Layout';
import Navbar from '../../Components/common/Navbar';
import User from '../../Components/common/User';
import styled from 'styled-components';


export default function ProductDetail() {
  return (
    <StyledLayout>
      <BasicHeader>판매 중인 상품</BasicHeader>
      <User/>
      <Navbar margin='0 -12px 0 -16px' />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
padding :48px 12px 73px 16px
`