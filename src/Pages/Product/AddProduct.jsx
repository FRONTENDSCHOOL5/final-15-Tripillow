import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Toggle from '../../Components/common/Toggle';
import styled from 'styled-components';
import Navbar from '../../Components/common/Navbar';
import Input from '../../Components/common/Input';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import URL from '../../Utils/URL';
import userToken from '../../Recoil/userToken/userToken';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import defaultImage from '../../Assets/addproduct.png';
import { useNavigate } from 'react-router-dom';

const AddProduct = (props) => {
  const [productName, setproductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const imageURL = imageLink;

  const handleSubmit = async () => {
    try {
      const response = await fetch(URL + '/product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },

        body: JSON.stringify({
          product: {
            itemName: productName,
            price: parseInt(price), //1원 이상
            link: description,
            itemImage: imageLink,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('에러 발생!!!!!');
    }
    navigate('/product');
  };
  const handleChange = async (e) => {
    const response = await ImageUploadAPI(e);
    setImageLink(`${URL}/${response.filename}`);

    console.log('@@@@@@@this2!@!#$#@$@#$', imageLink);
    // console.log(response)
  };

  const handleMinMax = (e) => {
   let price = parseInt(e.target.value);
    const maxPrice = 10000000;
    if (price > maxPrice) {
      setPrice(maxPrice);
    } else {
      setPrice(price);
    }
  };
  return (
    <Layout>
      <UploadHeader onClick={handleSubmit} disabled={!productName || !price || !description}>
        저장
      </UploadHeader>
      <Label htmlFor='file-upload'>
        <Image src={imageLink || defaultImage} />
      </Label>
      <input id='file-upload' className='a11y-hidden' onChange={handleChange} type='file' />
      <CategoryTxt>카테고리</CategoryTxt>
      <Toggle margin='0 0 20px 0' leftButton='여행용품' rightButton='외화' />

      {/* //fixme: label 클릭하면 input에 위치 */}
      <Input
        width='100%'
        value={productName}
        onChange={(e) => setproductName(e.target.value)}
        maxLength='16'
        // htmlFor={forId}
        label='상품명'
        placeholder='1~15자 이내여야 합니다.'
        mb='16px'
      />
      <SecondInput
        value={price}
        // onChange={(e) => setPrice(e.target.value);
        // handleMinMax}
        onChange={handleMinMax}
        label='가격'
        min='1'
        max='10000000'
        placeholder='1원부터 1천만원 사이의 값만 입력 가능합니다.'
        type='number'
        mb='16px'
      />
      {/* <Input
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        label='판매링크'
        placeholder='URL을 입력해주세요.'
        type='url'
        mb='16px'
      /> */}
      <label htmlFor='product' style={{ color: '#767676', fontSize: 'var(--xs)' }}>
        상세 설명
      </label>
      <ProductText id='product' value={description} onChange={(e) => setDescription(e.target.value)} />
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
  //fixme: 패딩 값 무시하고 가로 꽉 채우는 다른 방법?
  width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감
  height: 232px;
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
  cursor: pointer;
`;

const SecondInput = styled(Input)`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
//fixme: 상세설명이 layout 밖으로 나옴
const ProductText = styled.textarea.attrs({
  placeholder: '제품에 대한 설명을 입력해주세요!',
})`
  width: 100%;
  min-height: 140px;
  margin-top: 12px;
  padding: 10px;
  resize: none;
  border: 1px solid var(--light-gray);
  font-size: var(--xs);
  box-sizing: border-box;

  ::placeholder {
    color: var(--light-gray);
  }
  &:focus {
    border: 1px solid var(--primary);
  }
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

export default AddProduct;
