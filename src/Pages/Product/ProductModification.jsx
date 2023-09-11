import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import throttle from 'lodash.throttle';
import Toggle from 'Components/common/Toggle';
import styled from 'styled-components';
import Navbar from 'Components/common/Navbar';
import Input from 'Components/common/Input';
import defaultImage from 'Assets/addproduct.png';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadHeader from 'Components/common/Header/UploadHeader';
import ProductModifyAPI from 'Api/Product/ProductModifyAPI';
import ProductDetailAPI from 'Api/Product/ProductDetailAPI';
import { LayoutStyle } from 'Styles/Layout';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import Button from 'Components/common/Button';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/SideNav/useIsWideView';
import { uploadFile } from 'Utils/uploadFile';
import URL from 'Api/URL';

const ProductModification = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const [productInputs, setProductInputs] = useState({
    product: {
      itemName: '',
      price: '',
      link: '',
      itemImage: '',
    },
  });
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const [rightOn, setRightOn] = useState(false);
  const location = useLocation();
  const productId = location.state;
  const [isModified, setIsModified] = useState(false);
  const productDetail = ProductDetailAPI(productId);
  const { handleProductModify } = ProductModifyAPI(productId, productInputs, isLeftToggle);

  const trimContent = (content) => {
    const match = content?.match(/^\[(P|M)\]/);
    if (match) {
      if (match[0] === '[M]') {
        setRightOn(true);
      }
      return content.slice(3);
    }
    return content;
  };

  // 작성한 정보 불러오는 부분
  useEffect(() => {
    const getProductDetailData = async () => {
      const detailData = await productDetail();
      if (detailData && Object.keys(detailData).length > 0) {
        setProductInputs((prev) => ({
          product: {
            ...prev.productInput,
            itemName: trimContent(detailData.product.itemName),
            price: detailData.product.price,
            link: detailData.product.link,
            itemImage: detailData.product.itemImage,
          },
        }));
      }
    };

    getProductDetailData();
  }, [productDetail]);

  const handleImgChange = async (e) => {
    await uploadFile(e, (imageUrl) => {
      setProductInputs((productInputs) => ({
        ...productInputs,
        product: {
          ...productInputs.product,
          itemImage: URL + '/' + imageUrl,
        },
      }));
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInputs((prevState) => ({
      product: {
        ...prevState.product, //기존의 값 유지(복사)
        [name]: value, //동적으로 변화된 부분만 업데이트
      },
    }));
  };
  //memo: 계산된 속성명 (딥다이브 p.135참고):

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleProductModify();
    setIsModified(true);
  };
  const throttledHandleSubmit = throttle(handleSubmit, 3000, {
    leading: true,
    trailing: false,
  });

  useEffect(() => {
    if (isModified) navigate('/profile', { state: { isModified } });
  }, [isModified, navigate]);

  return (
    <Layout $isWideView={isWideView}>
      {!isWideView && (
        <UploadHeader type='submit' onClick={throttledHandleSubmit}>
          저장
        </UploadHeader>
      )}
      <form>
        <Label htmlFor='file-upload'>
          <Image src={productInputs.product?.itemImage || defaultImage} alt={productInputs.product.itemName} />
        </Label>
        <input id='file-upload' className='a11y-hidden' onChange={handleImgChange} type='file' />
        <CategoryTxt>카테고리</CategoryTxt>
        <Toggle
          margin='0 0 20px 0'
          leftButton='여행용품'
          rightButton='외화'
          setIsLeftToggle={setIsLeftToggle}
          rightOn={rightOn}
          setRightOn={setRightOn}
        />
        <Input
          width='100%'
          value={productInputs.product.itemName}
          name='itemName'
          onChange={handleInputChange}
          forId='product name'
          label='상품명'
          placeholder='2~15자 이내여야 합니다.'
          mb='16px'
        />
        <SecondInput
          value={productInputs.product.price}
          name='price'
          onChange={handleInputChange}
          forId='price'
          label='가격'
          placeholder='숫자만 입력 가능합니다.'
          type='number'
          mb='16px'
        />
        <label htmlFor='product' style={{ color: '#767676', fontSize: 'var(--xs)' }}>
          상세 설명
        </label>
        <ProductText
          id='product'
          name='link'
          value={productInputs.product.link}
          onChange={handleInputChange}
          $isWideView={isWideView}
        />
        {isWideView && (
          <Button type='submit' onClick={throttledHandleSubmit} width='90px' fontSize='14px' padding='7.75px'>
            저장
          </Button>
        )}
      </form>
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

const Label = styled.label`
  display: block;
  width: calc(100% + 16px + 12px);
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
const ProductText = styled.textarea.attrs({
  placeholder: '제품에 대한 설명을 입력해주세요!',
})`
  width: 100%;
  min-height: ${(props) => (props.$isWideView ? '340px' : '140px')};
  margin-top: 12px;
  padding: 10px;
  resize: none;
  border: 1px solid var(--light-gray);
  font-size: ${(props) => (props.$isWideView ? 'var(--lg)' : 'var(--sm')};
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
