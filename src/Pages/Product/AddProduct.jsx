import React from 'react';
import Toggle from '../../Components/common/Toggle';
import styled from 'styled-components';
import { Layout } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';

const ProductDetail = (props) => {
  return (
    <Layout>
      <BasicHeader></BasicHeader>
      <Image src='https://picsum.photos/536/354' />
      <CategoryTxt>카테고리</CategoryTxt>
      <Toggle margin='0 0 20px 0' leftButton='외화' rightButton='여행용품' />
      <TxtLayout>
        <DetailTitle>상품명</DetailTitle>
        <DetailTxt>싱싱한 감귤</DetailTxt>
      </TxtLayout>
      <TxtLayout>
        <DetailTitle>가격</DetailTitle>
        <DetailTxt>₩₩₩</DetailTxt>
      </TxtLayout>
      <TxtLayout>
        <DetailTitle>판매링크</DetailTitle>
        <DetailTxt>http://www.</DetailTxt>
      </TxtLayout>
    </Layout>
  );
};

const Image = styled.img`
  //fixme: 패딩 값 무시하고 가로 꽉 채우는 다른 방법?
  width: calc(100% + 16px + 12px); // Image 너비에 패딩값 차감
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
`;
const CategoryTxt = styled.div`
  color: var(--dark-gray);
  font-size: var(--xs);
  margin-bottom: 10px;
`;

const TxtLayout = styled.div`
  border-bottom: 1px solid var(--light-gray);
  margin-bottom: 16px;
`;
const DetailTitle = styled.div`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const DetailTxt = styled.div`
  font-size: var(--sm);
  color: black;
`;
export default ProductDetail;
