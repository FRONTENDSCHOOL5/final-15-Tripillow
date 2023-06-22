import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ProductItem from '../../Components/common/ProductItem';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';
import Toggle from '../../Components/common/Toggle';
import accountName from '../../Recoil/accountName/accountName';
import SkeletonItem from '../../Styles/SkeletonItem';

import ProductDetailAPI from '../../Utils/ProductDetailAPI';
import ProductListAPI from '../../Utils/ProductListAPI';
import URL from '../../Utils/URL';
import useFetch from '../../Hooks/useFetch';
import userToken from '../../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import Spinner from '../../Components/common/Spinner';

const Product = (props) => {
  const navigate = useNavigate();
  const name = useRecoilValue(accountName);
  const productData = ProductListAPI(name);
  const productList = productData?.product;

  const token = useRecoilValue(userToken);
  let accountnames = [];
  let usernames = [];
  const [products, setProducts] = useState([]);
  const [random, setRandom] = useState(0);

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch({
    url: `${URL}/profile/${name}/following`,
    req: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  });

  if (user) {
    user.map((item) => accountnames.push(item.accountname));
    user.map((item) => usernames.push(item.username));
  }

  if (userError) console.log(userError);

  const handleRandom = () => {
    setRandom((prev) => (prev === accountnames.length - 1 ? 0 : prev + 1));
  };

  const {
    data: product,
    loading: productLoading,
    error: productError,
  } = useFetch({
    url: `${URL}/product/${accountnames[random]}`,
    req: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  });

  useEffect(() => {
    if (product) {
      const productsArray = Object.values(product?.product || []);
      setProducts(productsArray);
    } else {
      setProducts([]);
    }
  }, [product]);

  // Random 번호를 productItem에 갔다가 나와도 유지할 수 있도록
  // 무한스크롤로 안되고 계속 사용시에는 Recoil에 저장할 예정
  // ====
  useEffect(() => {
    const savedRandom = localStorage.getItem('random');
    if (savedRandom) {
      setRandom(Number(savedRandom));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('random', random);
  }, [random]);
  // ====

  return (
    <StyledLayout>
      {userLoading && (
        <SpinnerLayout>
          <Spinner />
        </SpinnerLayout>
      )}
      <BasicHeader btn1='설정 및 개인정보' btn2='로그아웃' txt='정말 로그아웃 하시겠습니까?' rightbtn='확인'>판매 중인 상품</BasicHeader>
      {/* <Toggle leftButton='외화' rightButton='여행용품' margin='25px 0' /> */}
      <TitleLayout>{usernames[random]}님의 판매상품</TitleLayout>
      <GridLayout>
        {productLoading && (
          <SpinnerLayout>
            <Spinner />
          </SpinnerLayout>
        )}
        {products.length === 0 ? (
          <p>등록된 상품이 없습니다.</p>
        ) : (
          products.map((product, i) => (
            <Link to={`/product/detail/${product?.id}`} key={i}>
              <ProductItem key={i} product={product} onClick={ProductDetailAPI} />
            </Link>
          ))
        )}
      </GridLayout>
      <div>
        <CircleButton onClick={handleRandom} position='absolute' right='16px' bottom='150px'></CircleButton>
        <CircleButton
          onClick={() => {
            navigate('/addproduct');
          }}
          position='absolute'
          right='16px'
          bottom='94px'
        ></CircleButton>
      </div>
      <Navbar />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  padding: 48px 12px 73px 16px;
  position: relative;
`;

const TitleLayout = styled.h2`
  display: inline-block;
  margin: 20px 0;
  font-size: var(--md);
`;

const GridLayout = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

const SpinnerLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Product;
