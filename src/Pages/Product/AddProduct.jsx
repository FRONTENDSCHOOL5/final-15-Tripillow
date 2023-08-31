import React, { useState } from 'react';
import Toggle from '../../Components/common/Toggle';
import styled from 'styled-components';
import Navbar from '../../Components/common/Navbar';
import Input from '../../Components/common/Input';
import { LayoutStyle } from '../../Styles/Layout';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import URL from '../../Utils/URL';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import defaultImage from '../../Assets/addproduct.png';
import ErrorMSG from '../../Styles/ErrorMSG';
import UploadProductAPI from '../../Utils/UploadProductAPI';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import Button from '../../Components/common/Button';
import MyPillowings from '../../Components/Home/MyPillowings';
import { validateImageFileFormat } from '../../Utils/validate';
import imageCompression from 'browser-image-compression';
import throttle from 'lodash.throttle';

const AddProduct = (props) => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [priceErr, setPriceErr] = useState(false);
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const uploadProduct = UploadProductAPI({ productName, price, description, imageLink }, isLeftToggle);

  const handleSubmit = async () => {
    await uploadProduct();
    navigate('/profile');
  };

  const throttledHandleSubmit = throttle(handleSubmit, 3000, {
    leading: true,
    trailing: false,
  });

  const handleDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');
    const data = await ImageUploadAPI(file);
    if (data) {
      setImageLink(`${URL}/${data.filename}`);
    }
  };

  const handleImgChange = async (e) => {
    const file = e.target?.files[0];
    if (e.target.files[0].size > 10 * 1024 * 1024) {
      console.log('[ERROR 이미지 용량이 10MB를 넘습니다]');
      return null;
    }
    if (!validateImageFileFormat(e.target.files[0].name)) return alert('파일 확장자를 확인해주세요');

    // const response = await ImageUploadAPI(e);
    // setImageLink(`${URL}/${response.filename}`);

    const options = {
      maxSizeMB: 0.9,
      maxWidthOrHeight: 490,
      useWebWorker: true,
    };

    try {
      // 압축 결과
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        handleDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
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
    <Layout $isPCScreen={isPCScreen}>
      <h1 className='a11y-hidden'>상품 등록 페이지</h1>
      {!isPCScreen && (
        <UploadHeader onClick={throttledHandleSubmit} disabled={!imageLink || !productName || !price || !description}>
          저장
        </UploadHeader>
      )}
      <AddProductContent>
        <Label htmlFor='file-upload'>
          <Image src={imageLink || defaultImage} />
        </Label>
        <input id='file-upload' className='a11y-hidden' onChange={handleImgChange} type='file' />
        <CategoryTxt>카테고리</CategoryTxt>
        <Toggle margin='0 0 20px 0' leftButton='여행용품' rightButton='외화' setIsLeftToggle={setIsLeftToggle} />

        <Input
          width='100%'
          value={productName}
          onChange={handleInputChange}
          maxLength='16'
          forId='상품명'
          label='상품명'
          placeholder='1~15자 이내여야 합니다.'
          mb='16px'
        />
        {productName.length >= 16 && <ErrorMSG errorColor>1~15자 이내로 입력하세요.</ErrorMSG>}
        <SecondInput
          value={price}
          onChange={handleMinMax}
          forId='가격'
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
        <ProductText id='product' value={description} onChange={(e) => setDescription(e.target.value)} />
        {isPCScreen && (
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
      </AddProductContent>
      {isPCScreen || <Navbar />}
      {isPCScreen && <MyPillowings $on={isPCScreen} />}
    </Layout>
  );
};
const Layout = styled.div`
  ${LayoutStyle}

  padding: 48px 12px 73px 16px;
`;

const AddProductContent = styled.main`
  display: flex;
  flex-direction: column;

  textarea + button {
    margin-top: 14px;
    align-self: flex-end;
  }
`;

const Label = styled.label`
  display: block;
  width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감
  min-height: 232px;
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
