import React from 'react';
import AlertModal from '../../Components/common/AlertModal';
import TopNavBar from '../../Components/common/TopNavBar';
import SnsButton from '../../Components/common/SnsButton';
import ProductItem from '../../Components/common/ProductItem';
import Navbar from '../../Components/common/Navbar';

export default function Product() {
  return (
    <div>
      <TopNavBar>판매 중인 상품</TopNavBar>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <Navbar />
    </div>
  );
}
