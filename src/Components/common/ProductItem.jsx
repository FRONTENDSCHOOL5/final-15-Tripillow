import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
  const product = props.product;
  console.log(product)
  // console.log(productList);
  return (
    <>
      {
        <Link to={`/product/detail/${product?.id}`}>
          <ButtonLayout>
            <ProductImg src={product?.itemImage} alt={product?.itemName} />
            <ProductInfo size='14px' color='black'>
              {product?.itemName}
            </ProductInfo>
            <ProductInfo size='12px' color='#6CABFF' weight='700'>
              {product?.price.toLocaleString()}원
            </ProductInfo>
          </ButtonLayout>
        </Link>
      }
    </>
  );
};

const ButtonLayout = styled.button`
  text-align: left;
  padding: 0;
`;

const ProductImg = styled.img`
  border-radius: 8px;
  width: 140px;
  height: 90px;
  margin-bottom: 7px;
`;

const ProductInfo = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  margin-bottom: ${(props) => props.mb || '4px'};
`;

export default ProductItem;
