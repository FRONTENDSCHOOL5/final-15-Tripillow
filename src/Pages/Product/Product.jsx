import React from 'react';
import styled from 'styled-components';
import TopNavBar from '../../Components/common/TopNavBar';
import SnsButton from '../../Components/common/SnsButton';
import ProductItem from '../../Components/common/ProductItem';
import Navbar from '../../Components/common/Navbar';

export default function Product() {
  return (
    <div>
      <TopNavBar>판매 중인 상품</TopNavBar>
      <GridLayout>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </GridLayout>
      <Navbar />
    </div>
  );
}

const GridLayout = styled.div`
  padding-left: 19px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;
