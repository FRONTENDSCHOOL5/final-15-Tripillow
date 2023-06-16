import React, { useNavigate } from 'react';
import styled from 'styled-components';
import SnsButton from '../../Components/common/SnsButton';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import ProductItem from '../../Components/common/ProductItem';
import Navbar from '../../Components/common/Navbar';
import Button from '../../Components/common/Button';
import home from '../../Assets/icons/icon-home.svg';
import Toggle from '../../Components/common/Toggle';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';

export default function Product(props) {
  const navigate = useNavigate();
  return (
    <Layout>
      <BasicHeader>판매 중인 상품</BasicHeader>
      <GridLayout>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </GridLayout>
      <CircleButton bottom='100px'></CircleButton>
      <Navbar />
      <button
        onClick={() => {
          navigate('/addproduct');
        }}
      >
        button
      </button>
    </Layout>
  );
}

const GridLayout = styled.div`
  padding-left: 19px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;
