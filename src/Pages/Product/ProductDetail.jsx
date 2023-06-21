import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ProductDetailAPI from '../../Utils/ProductDetailAPI';

import Navbar from '../../Components/common/Navbar';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import hearticon from '../../Assets/icons/icon-heart.svg';
import Button from '../../Components/common/Button';
import User from '../../Components/common/User';

const AddProduct = (props) => {
  const [productId, setProductId] = useState('');
  const params = useParams();

  const productDetail = ProductDetailAPI(params.id);
  console.log(productDetail);
  // const author = productDetail?.author;

  useEffect(() => {
    setProductId(params.id);
  }, []);

  return (
    <>
      {productDetail && (
        <Layout>
          <BasicHeader
            // 함수={ProductDetailAPI}
            userId={productId}
            btn1='수정'
            btn2='삭제'
            txt='정말 삭제하시겠습니까?'
            rightbtn='삭제'
          >
            판매 중인 상품
          </BasicHeader>
          <Image src={productDetail.itemImage} />
          <User
            userImg={productDetail.author?.image}
            username={productDetail.author?.username}
            content={'@' + productDetail.author?.accountname}
          />
          <ProductContent size='var(--xl)' weight='700'>
            {productDetail.itemName}
          </ProductContent>
          <ProductContent size='var(--lg)'>{productDetail.link}</ProductContent>
          <ProductLayout>
            <Icon src={hearticon} />
            <ProudctPrice>{productDetail.price}원</ProudctPrice>
            <Button>채팅하기</Button>
          </ProductLayout>
          <Navbar />
        </Layout>
      )}
    </>
  );
};

const Layout = styled.div`
  max-width: 390px;
  min-height: 100%;
  padding: 48px 12px 73px 16px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid var(--light-gray);
`;

const Label = styled.label`
  display: block;
  /* width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감 */

  height: 232px;
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
`;
const Image = styled.img`
  width: 100%;
  width: calc(100% + 16px + 12px);
  margin-left: -16px;
  margin-right: -12px; // Image 너비에 패딩값 차감
  margin-bottom: 13px;
  height: 232px;
  object-fit: cover;
`;

const ProductContent = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight || '400'};
  margin-bottom: ${(props) => props.mb || '4px'};
  margin-top: 29px;
`;

// fixme: width 길이가 부모의 100% 안먹음.(fixed는 뷰포트 기준이기 때문에 width 100% 안됨)
const ProductLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 390px;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  bottom: 95px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 11px;
  cursor: pointer;
`;

// fixme: price 길어질때 처리, ',' 처리
const ProudctPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 82px;
`;

const ButtonLayout = styled.button`
  text-align: left;
  padding: 0;
`;

export default AddProduct;
