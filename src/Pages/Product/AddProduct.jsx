import React, { useState } from 'react';
import throttle from 'lodash.throttle';
import styled from 'styled-components';
import Toggle from 'Components/common/Toggle';
import Navbar from 'Components/common/Navbar';
import Input from 'Components/common/Input';
import { LayoutStyle } from 'Styles/Layout';
import UploadHeader from 'Components/common/Header/UploadHeader';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import defaultImage from 'Assets/addproduct.png';
import ErrorMSG from 'Styles/ErrorMSG';
import UploadProductAPI from 'Api/Product/UploadProductAPI';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import Button from 'Components/common/Button';
import MyPillowings from 'Components/Home/MyPillowings';
import { validateImageFileFormat } from 'Utils/validate';
import useIsWideView from 'Components/SideNav/useIsWideView';
import { uploadFile } from 'Utils/uploadFile';
import URL from 'Api/URL';
import { Label, SecondInput, ProductText, Image, CategoryTxt } from 'Styles/ProductSharedStyles';
import { isProduct } from 'Recoil/productCategory/productCategory';

const AddProduct = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [priceErr, setPriceErr] = useState(false);
  const [isLeftToggle, setIsLeftToggle] = useRecoilState(isProduct);
  const uploadProduct = UploadProductAPI({ productName, price, description, imageLink }, isLeftToggle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
    navigate('/profile');
  };

  const throttledHandleSubmit = throttle(handleSubmit, 3000, {
    leading: true,
    trailing: false,
  });

  const handleImgChange = async (e) => {
    const file = e.target?.files[0];
    if (!file) {
      return;
    } else if (file.size > 10 * 1024 * 1024) {
      alert('[ERROR 이미지 용량이 10MB를 넘습니다]');
      return null;
    } else if (!validateImageFileFormat(file.name)) return alert('파일 확장자를 확인해주세요');

    await uploadFile(e, (imageUrl) => {
      setImageLink(URL + '/' + imageUrl);
    });
  };

  const handleMinMax = (e) => {
    let price = parseInt(e.target.value);
    const maxPrice = 10000000;
    if (price > maxPrice) {
      setPrice(maxPrice);
      setPriceErr(true);
    } else {
      setPrice(price);
    }
  };

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  return (
    <Layout $isWideView={isWideView}>
      <h1 className='a11y-hidden'>상품 등록 페이지</h1>
      {!isWideView && (
        <UploadHeader onClick={throttledHandleSubmit} disabled={!imageLink || !productName || !price || !description}>
          저장
        </UploadHeader>
      )}
      <main>
        <form>
          <Label htmlFor='file-upload'>
            <Image src={imageLink || defaultImage} alt='상품 이미지' />
          </Label>
          <input id='file-upload' className='a11y-hidden' onChange={handleImgChange} type='file' />
          <CategoryTxt>카테고리</CategoryTxt>
          <Toggle margin='0 0 20px 0' leftButton='여행용품' rightButton='외화' setIsLeftToggle={setIsLeftToggle} />

          <Input
            width='100%'
            value={productName}
            onChange={handleInputChange}
            maxLength='16'
            forId='product name'
            label='상품명'
            placeholder='1~15자 이내여야 합니다.'
            mb='16px'
          />
          {productName.length >= 16 && <ErrorMSG errorColor>1~15자 이내로 입력하세요.</ErrorMSG>}
          <SecondInput
            value={price}
            onChange={handleMinMax}
            forId='price'
            label='가격'
            min='1'
            max='10000000'
            placeholder='1원부터 1천만원 사이의 값만 입력 가능합니다.'
            type='number'
            mb='16px'
          />
          {priceErr && <ErrorMSG errorColor>천만원 이하의 상품만 판매가능합니다.</ErrorMSG>}
          <label htmlFor='product' style={{ color: '#767676', fontSize: 'var(--xs)' }}>
            상세 설명
          </label>
          <ProductText
            id='product'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            $isWideView={isWideView}
          />
          {isWideView && (
            <Button
              type='submit'
              width='90px'
              fontSize='14px'
              padding='7.75px'
              onClick={throttledHandleSubmit}
              disabled={!imageLink || !productName || !price || !description}
            >
              저장
            </Button>
          )}
        </form>
      </main>
      {isWideView || <Navbar />}
      {isPCScreen && <MyPillowings $on={isPCScreen} />}
    </Layout>
  );
};
const Layout = styled.div`
  ${LayoutStyle}

  padding: 48px 12px 73px 16px;

  form {
    display: flex;
    flex-direction: column;
  }

  textarea + button {
    align-self: flex-end;
    margin-top: 14px;
  }
`;

export default AddProduct;
