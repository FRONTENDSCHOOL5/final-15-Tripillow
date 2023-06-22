import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ProductItem from '../../Components/common/ProductItem';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';
import accountName from '../../Recoil/accountName/accountName';
// import Toggle from '../../Components/common/Toggle';

import ProductDetailAPI from '../../Utils/ProductDetailAPI';

import URL from '../../Utils/URL';
import useFetch from '../../Hooks/useFetch';
import userToken from '../../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import Spinner from '../../Components/common/Spinner';
import ProductItemSkeleton from '../../Components/common/Skeleton/ProductItemSkeleton';

const Product = () => {
  const navigate = useNavigate();
  const name = useRecoilValue(accountName);
  const token = useRecoilValue(userToken);
  let accountnames = [];

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const ShowSkeletonArr = new Array(8).fill(0);

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch({
    url: `${URL}/profile/${name}/following/`,
    req: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  });

  if (user) {
    user.map((item) => {
      accountnames.push(item.accountname);
    });
  }

  if (userError) console.log(userError);

  const {
    data: product,
    loading: productLoading,
    error: productError,
  } = useFetch({
    url: `${URL}/product/${accountnames[count]}`,
    req: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  });

  if (productError) console.log(productError);

  useEffect(() => {
    if (product) {
      const productsArray = [...(product?.product || [])];
      setProducts((prev) => [...prev, ...productsArray]);
    } else {
      setProducts([]);
    }
  }, [product]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && !showSpinner) {
      setShowSpinner(true);
      setTimeout(() => {
        setCount((prev) => prev + 1);
        setShowSpinner(false);
        document.documentElement.scrollTop -= 55;
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledLayout>
      <BasicHeader>판매 중인 상품</BasicHeader>
      {/* <Toggle leftButton='외화' rightButton='여행용품' margin='25px 0' /> */}
      <GridLayout>
        {userLoading && (
          <>
            {ShowSkeletonArr.map(() => (
              <GridItem>
                <ProductItemSkeleton />
              </GridItem>
            ))}
          </>
        )}
        {products
          ? products.map((product, i) => (
              <GridItem>
                <Link to={`/product/detail/${product?.id}`} key={i}>
                  <ProductItem key={i} product={product} onClick={() => ProductDetailAPI(product)} />
                </Link>
              </GridItem>
            ))
          : !productLoading && <p>등록된 상품이 없습니다.</p>}
      </GridLayout>
      {showSpinner && products.length > 0 && <Spinner />}
      <div>
        <CircleButton
          onClick={() => {
            navigate('/addproduct');
          }}
          position='fixed'
          right='34%'
          bottom='94px'
        ></CircleButton>
      </div>
      <Navbar />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  padding: 63px 12px 88px 16px;
`;

const GridLayout = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

const GridItem = styled.div`
  margin: 0 auto;
`;
export default Product;
