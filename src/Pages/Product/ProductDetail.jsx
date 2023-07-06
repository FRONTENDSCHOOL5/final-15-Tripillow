import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import accountName from '../../Recoil/accountName/accountName';
import ProductDetailAPI from '../../Utils/ProductDetailAPI';
import { LayoutStyle } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import hearticon from '../../Assets/icons/icon-heart.svg';
import heartfill from '../../Assets/icons/icon-heart-fill.svg';
import Button from '../../Components/common/Button';
import User from '../../Components/common/User';
import chatLists from '../../Mock/chatLists';

const AddProduct = (props) => {
  const [productId, setProductId] = useState('');
  const [isClick, setIsClick] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const userName = useRecoilValue(accountName);
  const productDetail = ProductDetailAPI(params.id);
  const userImg = productDetail.author?.image;
  const [userCheck, setUserCheck] = useState(false);

  const [randomMessage, setRandomMessage] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  const username = productDetail.author?.username;
  useEffect(() => {
    setProductId(params.id);
  }, []);

  useEffect(() => {
    if (userName === productDetail.author?.accountname) setUserCheck(true);
  }, [accountName, productDetail.author?.accountname]);

  return (
    <>
      {productDetail && (
        <Layout>
          <BasicHeader
            empty={!userCheck}
            userId={productId}
            btn1='수정'
            btn2='삭제'
            txt='정말 삭제 하시겠습니까?'
            rightbtn='확인'
          >
            판매 중인 상품
          </BasicHeader>
          <main>
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
          </main>
          <ProductButtonLayout>
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
          </ProductButtonLayout>
        </Layout>
      )}
    </>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  padding: 48px 12px 73px 16px;
`;

const Image = styled.img`
  width: 100%;
  width: calc(100% + 16px + 12px);
  margin-left: -16px;
  margin-right: -12px;
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

const ProductButtonLayout = styled.div`
  display: flex;
  width: 390px;
  margin: 0 auto;
  align-items: center;
  padding: 25px 0 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: white;
  border-top: 0.5px solid var(--light-gray);
  border: 1px solid var(--light-gray);
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

const ProudctPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
`;

export default AddProduct;
