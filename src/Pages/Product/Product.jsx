import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ProductItem from '../../Components/common/ProductItem';
import { Layout } from '../../Styles/Layout';
import CircleButton from '../../Components/common/CircleButton';
import accountName from '../../Recoil/accountName/accountName';
import Toggle from '../../Components/common/Toggle';
import ProductItemSkeleton from '../../Components/common/Skeleton/ProductItemSkeleton';

import URL from '../../Utils/URL';
import userToken from '../../Recoil/userToken/userToken';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import { isProduct } from '../../Recoil/productCategory/productCategory';

const Product = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
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

  if (userError) console.log(userError);

  const {
    data: productsQuery,
    error: productError,
    isLoading: productLoading,
  } = useQuery(
    'products',
    async () => {
      if (userLoading === false) {
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
      }
    },
    {
      enabled: !!user,
    },
  );

  if (productError) console.log(productError);


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
    <StyledLayout $isPCScreen={isPCScreen}>
      {!isPCScreen && (
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
                <GridItem key={index}>
                  <ProductItemSkeleton />
                </GridItem>
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
      {isPCScreen || <Navbar />}
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

const GridItem = styled.div`
  margin: 0 auto;
`;

export default Product;
