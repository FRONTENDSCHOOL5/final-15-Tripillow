import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProductDetailAPI from '../../Utils/ProductDetailAPI';

import Navbar from '../../Components/common/Navbar';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import hearticon from '../../Assets/icons/icon-heart.svg';
import heartfill from '../../Assets/icons/icon-heart-fill.svg';
import Button from '../../Components/common/Button';
import User from '../../Components/common/User';
import chatLists from '../Chat/chatLists';

const AddProduct = (props) => {
  const [productId, setProductId] = useState('');
  console.log('🚀  productId:', productId);
  const [isClick, setIsClick] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const productDetail = ProductDetailAPI(params.id);
  const userImg = productDetail.author?.image;

  const [randomMessage, setRandomMessage] = useState('');
  console.log('🚀  randomMessage:', randomMessage);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  console.log(productDetail);
  const username = productDetail.author?.username;
  useEffect(() => {
    setProductId(params.id);
  }, []);

  return (
    <>
      {productDetail && (
        <Layout>
          <BasicHeader userId={productId} empty>
            판매 중인 상품
          </BasicHeader>
          <Image src={productDetail.itemImage} />
          <User
            accountname={productDetail.author?.accountname}
            userImg={productDetail.author?.image}
            username={productDetail.author?.username}
            content={'@' + productDetail.author?.accountname}
          />
          <ProductContent size='var(--xl)' weight='700'>
            {productDetail.itemName}
          </ProductContent>
          <ProductContent size='var(--lg)' height='1.4' style={{ whiteSpace: 'pre-wrap' }}>
            {productDetail.link}
          </ProductContent>
          <ProductLayout>
            <div style={{ display: 'flex', marginLeft: '20px' }}>
              <Icon
                src={isClick === false ? hearticon : heartfill}
                onClick={() => {
                  setIsClick(!isClick);
                }}
              />
              <ProudctPrice>{productDetail.price?.toLocaleString()}원</ProudctPrice>
            </div>
            <Button
              onClick={() => {
                navigate(`/chat/${username}`, { state: { username, userImg, randomMessage } });
              }}
              right='12px'
              position='absolute'
              margin='0 0 5px 0'
            >
              채팅하기
            </Button>
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
  line-height: ${(props) => props.height};
  word-break: break-all;
`;

const ProductLayout = styled.div`
  display: flex;
  /* justify-content: space-around; */
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
  margin-right: 8px;
  /* margin-left: -35px; */
  cursor: pointer;
`;

const ProudctPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  /* margin-right: 82px; */
`;

const ButtonLayout = styled.button`
  text-align: left;
  padding: 0;
`;

export default AddProduct;
