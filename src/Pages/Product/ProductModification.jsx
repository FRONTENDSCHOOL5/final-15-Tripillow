import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Toggle from '../../Components/common/Toggle';
import styled from 'styled-components';
import Navbar from '../../Components/common/Navbar';
import Input from '../../Components/common/Input';
import URL from '../../Utils/URL';
import userToken from '../../Recoil/userToken/userToken';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import defaultImage from '../../Assets/addproduct.png';
import { useNavigate } from 'react-router-dom';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import UserInfoAPI from '../../Utils/MyInfoAPI';
import GetPostAPI from '../../Utils/GetPostAPI';
import ProductListAPI from '../../Utils/ProductListAPI';
import accountName from '../../Recoil/accountName/accountName';

const AddProduct = (props) => {
  const [productName, setproductName] = useState('');
  const [price, setPrice] = useState('');
  const [saleLink, setSaleLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const name = useRecoilValue(accountName);
  const userData = UserInfoAPI();
  const postData = GetPostAPI();
  const productData = ProductListAPI(name);
  const productList = productData.product;
  console.log(productList);

  return (
    <Layout>
      <BasicHeader>판매 중인 상품3</BasicHeader>
      <>
        {productList &&
          productList.map((product, index) => (
            <ButtonLayout>
              <ProductImg src={product.itemImage} alt={product.itemName} />
              <ProductInfo size='14px' color='black'>
                {product.itemName}
              </ProductInfo>
              <ProductInfo size='12px' color='#6CABFF' weight='700'>
                {product.price.toLocaleString()}원
              </ProductInfo>
            </ButtonLayout>
          ))}
      </>

      <Navbar />
    </Layout>
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
  width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감
  height: 232px;
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CategoryTxt = styled.div`
  color: var(--dark-gray);
  font-size: var(--xs);
  margin-bottom: 10px;
`;

const ButtonLayout = styled.button`
  text-align: left;
  padding: 0;
`;

const ProductImg = styled.img`
  border-radius: 8px;
  width: 140px;
  height: 90px;
  margin-bottom: 7px;
`;

const ProductInfo = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  margin-bottom: ${(props) => props.mb || '4px'};
`;

export default AddProduct;
