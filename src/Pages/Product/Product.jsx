import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import ProductItem from '../../Components/common/ProductItem';
import Navbar from '../../Components/common/Navbar';
import home from '../../Assets/icons/icon-home.svg';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';
import Toggle from '../../Components/common/Toggle';

export default function Product(props) {
  const navigate = useNavigate();
  return (
    <StyledLayout>
      <BasicHeader>판매 중인 상품</BasicHeader>
      <Toggle leftButton='외화' rightButton='여행용품' margin='25px 0' />
      <GridLayout>
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </GridLayout>
      <CircleButton
     
        onClick={() => {
          navigate('/addproduct');
        }}
        right='15px'
        bottom='84px'
      ></CircleButton>
      <Navbar />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  padding: 48px 12px 73px 16px;

`;
const GridLayout = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;
