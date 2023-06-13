import React from 'react';
import AlertModal from '../Components/common/AlertModal';
import TopNavBar from '../Components/common/TopNavBar';
import SnsButton from '../Components/common/SnsButton';
import ProductItem from '../Components/common/ProductItem';
import Navbar from '../Components/common/Navbar';

export default function Product() {
  return (
    <div>
      <TopNavBar />
      {/* <AlertModal txt='상품을 삭제할까요?' /> */}
    
      <ProductItem/>
      <ProductItem/>
      <ProductItem/>
      <Navbar/>
    </div>
  );
}
