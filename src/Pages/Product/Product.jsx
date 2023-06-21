import React from 'react';
import styled from 'styled-components';
import { useNavigate , Link} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

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


export default function Product(props) {
  const navigate = useNavigate();
  const name = useRecoilValue(accountName);
  const productData = ProductListAPI(name);
  const productList = productData.product;
  console.log(productList);

  return (
    <StyledLayout>
      <BasicHeader>판매 중인 상품</BasicHeader>
      <Toggle leftButton='외화' rightButton='여행용품' margin='25px 0' />
      <GridLayout>
        {productList?.map((product, i) => (
          <Link to={`/product/detail/${product?.id}`} key={i} >
            <SkeletonLayout>
              <ProductItem key={i} product={product} onClick={ProductDetailAPI} />
            </SkeletonLayout>
          </Link>
        ))}
      </GridLayout>
      <CircleButton
        onClick={() => {
          navigate('/addproduct');
        }}
        right='16px'
        bottom='94px'
      ></CircleButton>
      <Navbar />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  padding: 48px 12px 73px 16px;
  position: relative;
`;

const SkeletonLayout = styled(SkeletonItem)`
  width: 140px;
`;
const GridLayout = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;
