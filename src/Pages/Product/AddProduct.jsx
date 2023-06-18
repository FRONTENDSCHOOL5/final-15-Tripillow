import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Toggle from '../../Components/common/Toggle';
import styled from 'styled-components';
import Navbar from '../../Components/common/Navbar';
import Input from '../../Components/common/Input';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import URL from '../../Utils/URL';
import userToken from '../../Recoil/userToken/userToken';

const AddProduct = (props) => {
  const [productName, setproductName] = useState('');
  const [price, setPrice] = useState('');
  const [saleLink, setSaleLink] = useState('');
  const [token, setToken] = useRecoilState(userToken);

  console.log(token);
  const handleSubmit = async () => {
    // e.preventDefault();
    // e.stopPropagation();

    try {
      const response = await fetch(URL + '/product', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer {token}',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            itemName: productName,
            price: price, //1원 이상
            link: saleLink,
            itemImage: String,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('에러 발생!!!!!');
    }
  };

  return (
    <Layout>
      <UploadHeader disabled onClick={handleSubmit}>
        저장
      </UploadHeader>

      <Image src='https://slp-statics.astockcdn.net/static_assets/staging/22spring/kr/illustrations/categories/card-2.jpg?width=580&format=webp' />

      <CategoryTxt>카테고리</CategoryTxt>
      <Toggle margin='0 0 20px 0' leftButton='여행용품' rightButton='외화' />
      <Input width='100%'
        value={productName}
        onChange={(e) => setproductName(e.target.value)}
        label='상품명'
        placeholder='2~15자 이내여야 합니다.'
        mb='16px'
      />
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        label='가격'
        placeholder='숫자만 입력 가능합니다.'
        type='number'
        mb='16px'
      />
      <Input
        value={saleLink}
        onChange={(e) => setSaleLink(e.target.value)}
        label='판매링크'
        placeholder='URL을 입력해주세요.'
        type='url'
        mb='16px'
      />
      <button onClick={handleSubmit}>btn</button>
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
const Image = styled.img`
  //fixme: 패딩 값 무시하고 가로 꽉 채우는 다른 방법?
  width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
`;
const CategoryTxt = styled.div`
  color: var(--dark-gray);
  font-size: var(--xs);
  margin-bottom: 10px;
`;

export default AddProduct;
