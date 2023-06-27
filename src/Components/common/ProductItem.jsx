import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultImg from '../../Assets/defaultImg.png';

const ProductItem = (props) => {
  const product = props.product;
  const productImg = props.product.itemImage;
  const productImgValidation =
    productImg.startsWith('https:') || productImg.startsWith('data:image') ? product?.itemImage : defaultImg;
  return (
    <>
      <ProductLayout to={`/product/detail/${product?.id}`}>
        <ButtonLayout>
          <ProductImg src={productImgValidation} alt={product?.itemName} />
          <ProductInfo size='14px' color='black'>
            {product?.itemName?.length < 14 ? product?.itemName : product?.itemName.slice(0, 13) + '...'}
          </ProductInfo>
          <ProductInfo size='12px' color='#6CABFF' weight='700'>
            {product?.price?.toLocaleString()}원
          </ProductInfo>
        </ButtonLayout>
      </ProductLayout>
    </>
  );
};

const ProductLayout = styled(Link)`
  flex-shrink: 0;
  min-width: 160px;
`;

const ButtonLayout = styled.button`
  width: 160px;
  height: 90px;
  overflow: hidden;
  border-radius: 8px;
  text-align: left;
  padding: 0;
  margin-bottom: 7px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  margin-bottom: ${(props) => props.mb || '4px'};
`;

export default ProductItem;
