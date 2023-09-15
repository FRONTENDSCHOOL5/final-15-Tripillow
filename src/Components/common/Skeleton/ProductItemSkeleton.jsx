import useIsWideView from 'Components/SideNav/useIsWideView';
import React from 'react';
import styled from 'styled-components';
import SkeletonItem from 'Styles/SkeletonItem';

function ProductItemSkeleton(props) {
  const isWideView = useIsWideView();
  return (
    <>
      <ProductImgSkeleton $isWideView={isWideView} />
      <ProductInfoSkeleton />
      <ProductPriceSkeleton />
    </>
  );
}

const ProductImgSkeleton = styled(SkeletonItem)`
  width: ${(props) => (props.$isWideView ? '220px' : '160px')};
  height: ${(props) => (props.$isWideView ? '120px' : '90px')};
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
