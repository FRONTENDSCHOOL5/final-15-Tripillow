import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import { Layout } from 'Styles/Layout';
import CircleButton from 'Components/common/CircleButton';
import accountName from 'Recoil/accountName/accountName';
import Toggle from 'Components/common/Toggle';
import userToken from 'Recoil/userToken/userToken';
import URL from 'Api/URL';

import isDesktop from 'Recoil/isDesktop/isDesktop';
import { isProduct } from 'Recoil/productCategory/productCategory';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';
import LazyLoadedProductItem from './LazyLoadedProductItem';
import FollowingListAPI from 'Api/Profile/FollowingListAPI';

const Product = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const name = useRecoilValue(accountName);
  const [isLeftToggle, setIsLeftToggle] = useRecoilState(isProduct);
  const token = useRecoilValue(userToken);
  const { fetchFollowing } = FollowingListAPI(name);

  const { data: user, isLoading: userLoading, error: userError } = useQuery('followingAccounts', fetchFollowing);

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
      staleTime: 30000,
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
    <>
      <MetaTag
        title='Tripillow 상품'
        description='팔로잉 하는 사람들의 여행 중고 물품을 구경하고 거래해보세요'
        url='https://tripillow.netlify.app/product'
      />
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
        <GridLayout $isWideView={isWideView}>
          {isLeftToggle
            ? tripProduct.map((product, i) => <LazyLoadedProductItem key={i} product={product} />)
            : tripMoney.map((product, i) => <LazyLoadedProductItem key={i} product={product} />)}
          {productLoading === false && productsQuery?.length === 0 && <p>등록된 상품이 없습니다.</p>}
        </GridLayout>
        <AddBtnLayout $isWideView={isWideView}>
          <CircleButton
            onClick={() => {
              navigate('/addproduct');
            }}
            position='relative'
            margin='0 0 0 auto'
          ></CircleButton>
        </AddBtnLayout>
        {isWideView || <Navbar />}
        {isPCScreen && <MyPillowings $on={isPCScreen} />}
      </StyledLayout>
    </>
  );
};

const StyledLayout = styled(Layout)`
  padding: 63px 12px 88px 16px;
  position: relative;
`;

const GridLayout = styled.main`
  padding-bottom: 90px;
  display: grid;
  grid-gap: ${(props) => (props.isWideView ? '20px' : '40px')};
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

const AddBtnLayout = styled.div`
  position: fixed;
  width: ${(props) => (props.$isWideView ? '450px' : '360px')};
  height: 48px;
  bottom: ${(props) => (props.$isWideView ? '65px' : '100px')};
`;
export default Product;
