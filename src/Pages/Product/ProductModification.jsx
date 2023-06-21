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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserInfoAPI from '../../Utils/UserInfoAPI';
import GetPostAPI from '../../Utils/GetPostAPI';
import ProductListAPI from '../../Utils/ProductListAPI';
import accountName from '../../Recoil/accountName/accountName';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import ProductModifyAPI from '../../Utils/ProductModifyAPI';

const ProductModification = (props) => {
  const [imageLink, setImageLink] = useState('');
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);
  const name = useRecoilValue(accountName);
  const productData = ProductListAPI(name);
  const productList = productData.product;
  console.log(productList);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');

  const [productInputs, setProductInputs] = useState({
    product: {
      itemName: '',
      price: '',
      link: '',
      itemImage: '',
    },
  });
  const location = useLocation();
  const productId = location.state;
  console.log(productId);

  const handleImgChange = async (e) => {
    const response = await ImageUploadAPI(e);
    setNewImage(`${URL}/${response.filename}`);

    console.log('@@@@@@@this2!@!#$#@$@#$', imageLink);
    // console.log(response)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInputs((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  const handleModify = async (productInputs) => {
    try {
      const response = await fetch(`${URL}/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ productInputs }),
      });

      const data = await response.json();
      return data;
      console.log(data);
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };

  return (
    <Layout>
      <UploadHeader onClick={handleModify}>저장</UploadHeader>
      <Label htmlFor='file-upload'>
        <Image src={imageLink || defaultImage} />
      </Label>
      <input id='file-upload' className='a11y-hidden' onChange={handleImgChange} type='file' />
      <CategoryTxt>카테고리</CategoryTxt>
      <Toggle margin='0 0 20px 0' leftButton='여행용품' rightButton='외화' />

      {/* //fixme: label 클릭하면 input에 위치 */}
      <Input
        width='100%'
        value={productInputs.product.itemName}
        name='itemName'
        onChange={handleInputChange}
        // htmlFor={forId}
        label='상품명'
        placeholder='2~15자 이내여야 합니다.'
        mb='16px'
      />
      <SecondInput
        value={productInputs.product.price}
        name='price'
        onChange={handleInputChange}
        label='가격'
        placeholder='숫자만 입력 가능합니다.'
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
      <ProductText id='product' name='link' value={productInputs.product.link} onChange={handleInputChange} />
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

export default ProductModification;
