import React from 'react';
import styled from 'styled-components';

export default function ProductItem() {
  return (
    <div>
      <ProductImg
        src='https://images.unsplash.com/photo-1685987300287-6c1dc4d0508e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt=''
      />
      <ProductInfo size='14px' color='black'>
        판매 상품
      </ProductInfo>
      <ProductInfo size='12px' color='#6CABFF' weight='700'>
        35,000원
      </ProductInfo>
    </div>

  );
}


const ProductImg = styled.img`
  border-radius: 8px;
  width: 140px;
  height: 90px;
  margin-bottom: 7px;
`;

const ProductInfo = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  margin-bottom: ${(props) => props.mb || '4px'};
`;
