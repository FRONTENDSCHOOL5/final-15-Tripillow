import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import ProductItem from 'Components/common/ProductItem';
import { Layout } from 'Styles/Layout';
import CircleButton from 'Components/common/CircleButton';
import accountName from 'Recoil/accountName/accountName';
import Toggle from 'Components/common/Toggle';
import ProductItemSkeleton from 'Components/common/Skeleton/ProductItemSkeleton';

import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import { isProduct } from 'Recoil/productCategory/productCategory';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/SideNav/useIsWideView';

const Product = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const name = useRecoilValue(accountName);
  const token = useRecoilValue(userToken);
  const [isLeftToggle, setIsLeftToggle] = useRecoilState(isProduct);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery('followingAccounts', async () => {
    const response = await fetch(`${URL}/profile/${name}/following/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    return response.json();
  });

  const {
    data: productsQuery,
    error: productError,
    isLoading: productLoading,
  } = useQuery(
    'products',
    async () => {
      const productsData = await Promise.all(
        user.map(async (followingAccount) => {
          const response = await fetch(`${URL}/product/${followingAccount.accountname}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-type': 'application/json',
            },
          });
          const responseData = await response.json();
          return responseData;
        }),
      );
      return productsData;
    },
    {
      enabled: !!user && !userLoading,
    },
  );

  if (userError) return alert(userError);

  if (productError) return alert(productError);

  const tripProduct = [];
  const tripMoney = [];

  productsQuery?.forEach((item) => {
    item.product.forEach((product) => {
      if (product.itemName.startsWith('[P]') || !product.itemName.startsWith('[M]')) {
        tripProduct.push(product);
      } else if (product.itemName.startsWith('[M]')) {
        tripMoney.push(product);
      }
    });
  });

  return (
    <StyledLayout $isWideView={isWideView}>
      {!isWideView && (
        <BasicHeader btn1='설정 및 개인정보' btn2='로그아웃' txt='정말 로그아웃 하시겠습니까?' rightbtn='확인'>
          Pillower의 판매상품
        </BasicHeader>
      )}
      <Toggle
        margin='0 0 20px 0'
        leftButton='여행용품'
        rightButton='외화'
        setIsLeftToggle={setIsLeftToggle}
        rightOn={!isLeftToggle}
      />
      <GridLayout>
        {userLoading === true ||
          (productLoading === true && (
            <>
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index}>
                  <ProductItemSkeleton />
                </div>
              ))}
            </>
          ))}
        {isLeftToggle
          ? tripProduct.map((product, i) => <ProductItem key={i} product={product} />)
          : tripMoney.map((product, i) => <ProductItem key={i} product={product} />)}
        {productLoading === false && productsQuery?.length === 0 && <p>등록된 상품이 없습니다.</p>}
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
      {isWideView || <Navbar />}
      {isPCScreen && <MyPillowings $on={isPCScreen} />}
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  padding: 63px 12px 88px 16px;
  position: relative;
`;

const GridLayout = styled.main`
  padding-bottom: 90px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

export default Product;
