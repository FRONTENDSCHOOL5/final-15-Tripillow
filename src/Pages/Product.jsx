import React from 'react';
import AlertModal from '../Components/common/AlertModal';
import TopNavBar from '../Components/common/TopNavBar';
import SnsButton from '../Components/common/SnsButton';
import ProductItem from '../Components/common/ProductItem';

export default function Product() {
  return (
    <div>
      <TopNavBar />
      {/* <AlertModal txt='상품을 삭제할까요?' /> */}
      <SnsButton kakao mb='10px' >카카오톡 계정으로 로그인</SnsButton>
      <SnsButton google mb='10px'>구글 계정으로 로그인</SnsButton>
      <SnsButton facebook>페이스북 계정으로 로그인</SnsButton>
      <ProductItem/>
    </div>
  );
}
