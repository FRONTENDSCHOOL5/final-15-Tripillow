import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Navbar from '../../Components/common/Navbar';
import userToken from '../../Recoil/userToken/userToken';
import { useNavigate, useParams } from 'react-router-dom';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import ProductDetailAPI from '../../Utils/ProductDetailAPI';
import hearticon from '../../Assets/icons/icon-heart.svg';
import Button from '../../Components/common/Button';
import User from '../../Components/common/User';

const AddProduct = (props) => {
  const [productName, setproductName] = useState('');
  const params = useParams();
  // const [price, setPrice] = useState('');
  // const [saleLink, setSaleLink] = useState('');
  // const [imageLink, setImageLink] = useState('');
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const productDetail = ProductDetailAPI(params.id);
  const author = productDetail?.author;
  // console.log(productDetail);
  console.log(author);

  return (
    <>
      {productDetail && (
        <Layout>
          <BasicHeader>판매 중인 상품</BasicHeader>
          <Image src={productDetail.itemImage} />
          <User
            userImg={productDetail.author?.image}
            username={productDetail.author?.username}
            content={'@' + productDetail.author?.accountname}
          />
          <ProductContent size='var(--xl)' weight='700'>
            {productDetail.itemName}
          </ProductContent>
          <ProductInfoContainer>
            <Icon src={hearticon} />
            <ProudctPrice>{productDetail.price}원</ProudctPrice>
            <Button>채팅하기</Button>
          </ProductInfoContainer>
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
  //fixme: 패딩 값 무시하고 가로 꽉 채우는 다른 방법?
  /* width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감 */

  height: 232px;
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
`;
const Image = styled.img`
  /* width: calc(100% + 16px + 12px); */
  width: 100%;
  margin-left: -16px;
  margin-right: -12px; // Image 너비에 패딩값 차감
  margin-bottom: 13px;
  height: 232px;
  object-fit: cover;
`;

const ProductContent = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  margin-bottom: ${(props) => props.mb || '4px'};
  margin-top: 29px;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  /* justify-content: s; */
  align-items: center;
  position: fixed;
  bottom: 76px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 11px;
  cursor: pointer;
`;

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
