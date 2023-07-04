import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ProductItem from '../../Components/common/ProductItem';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';
import accountName from '../../Recoil/accountName/accountName';

import ProductDetailAPI from '../../Utils/ProductDetailAPI';

import URL from '../../Utils/URL';
import useFetch from '../../Hooks/useFetch';
import userToken from '../../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

import ProductItemSkeleton from '../../Components/common/Skeleton/ProductItemSkeleton';

const Product = () => {
  const navigate = useNavigate();
  const name = useRecoilValue(accountName);
  const token = useRecoilValue(userToken);
  const followingAccounts = [];

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);

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

  if (userError) console.log(userError);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      user.map((item) => {
        followingAccounts.push(item.accountname);
      });
      const fetchProducts = async () => {
        const productsData = await Promise.all(
          followingAccounts.map(async (followingAccount) => {
            const response = await fetch(`${URL}/product/${followingAccount}/`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
            });
            const responseData = await response.json();

            return responseData.product;
          }),
        );

        const mergedProducts = productsData.flat();
        setProducts(mergedProducts);
        setIsLoading(false);
      };

      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [user]);

  return (
    <StyledLayout>
      <BasicHeader btn1='설정 및 개인정보' btn2='로그아웃' txt='정말 로그아웃 하시겠습니까?' rightbtn='확인'>
        Pillower의 판매상품
      </BasicHeader>
      <GridLayout>
        {userLoading ||
          (isLoading && (
            <>
              {Array.from({ length: 8 }, (_, index) => (
                <GridItem key={index}>
                  <ProductItemSkeleton />
                </GridItem>
              ))}
            </>
          ))}
        {products?.length > 0 &&
          products.map((product, i) => (
            <GridItem key={i}>
              <Link to={`/product/detail/${product?.id}`}>
                <ProductItem product={product} onClick={() => ProductDetailAPI(product)} />
              </Link>
            </GridItem>
          ))}
        {!isLoading && products.length === 0 && <p>등록된 상품이 없습니다.</p>}
      </GridLayout>
      <div style={{ position: 'fixed', width: '360px', height: '48px', bottom: '100px' }}>
        <CircleButton
          onClick={() => {
            navigate('/addproduct');
          }}
          position='relative'
          margin='0 0 0 auto'
          width='50px'
          height='50px'
        ></CircleButton>
      </div>
      <Navbar />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  padding: 63px 12px 88px 16px;
  position: relative;
`;

const GridLayout = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

const GridItem = styled.div`
  margin: 0 auto;
`;

export default Product;
