import React from 'react';
import AlertModal from '../Components/common/AlertModal';
import Header from '../Components/common/TopNavBar';
import TopNavBar from '../Components/common/TopNavBar';

export default function Product() {
  return (
    <div>
      <TopNavBar />
      <AlertModal txt='상품을 삭제할까요?' rightbtn='삭제' leftbtn='확인' />
    </div>
  );
}
