import React from 'react';
import styled from 'styled-components';
import SkeletonItem from '../../../Styles/SkeletonItem';

function ProductItemSkeleton() {
  return (
    <>
      <ProductImgSkeleton />
      <ProductInfoSkeleton />
      <ProductPriceSkeleton />
    </>
  );
}

const ProductImgSkeleton = styled(SkeletonItem)`
  width: 140px;
  height: 90px;
  margin-bottom: 7px;
  border-radius: 8px;
`;

const ProductInfoSkeleton = styled(SkeletonItem)`
  width: 95px;
  height: 15px;
  margin-bottom: 4px;
`;

const ProductPriceSkeleton = styled(SkeletonItem)`
  width: 60px;
  height: 15px;
  margin-bottom: 4px;
`;
export default ProductItemSkeleton;
