import React from 'react';
import AlertModal from '../Components/common/AlertModal';
import TopNavBar from '../Components/common/TopNavBar';
import SnsButton from '../Components/common/SnsButton';

export default function Product() {
  return (
    <div>
      <TopNavBar />
      <AlertModal txt='상품을 삭제할까요?' />
      <SnsButton borderColor='yellow'>카카오톡 계정으로 로그인</SnsButton>
      <SnsButton></SnsButton>

    </div>
  );
}
