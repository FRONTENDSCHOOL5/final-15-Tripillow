import React, { useState } from 'react';
// import UserName from '../Components/common/UserName';
import styled from 'styled-components';
import User from '../common/User';
import images from '../../test/images';
import Profile from '../../Assets/profile-sm.png';
import arrowRight from '../../Assets/icons/icon-arrow-right.svg';
import arrowLeft from '../../Assets/icons/icon-arrow-left.svg';
import iconHeart from '../../Assets/icons/icon-heart.svg';
import iconChat from '../../Assets/icons/icon-message-circle-1.svg';

const HomePostLayout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 임의로 이미지 생성
  const pictures = [...images];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  // todo: props 받아주기
  return (
    <Layout>
      <User userImg={Profile} username='애월읍 위니브' content='@ haron-lee'>
        애월읍 위니브
      </User>
      <ImageLayout>
        <ArrowButton onClick={handlePrev} bgImage={arrowLeft} left='16px'></ArrowButton>
        <img src={pictures[currentIndex].src} alt='' />
        <ArrowButton onClick={handleNext} bgImage={arrowRight} right='16px'></ArrowButton>
        <IndicatorLayout>
          {images.map((_, index) => {
            return <Indicator key={index} onIndicator={index === currentIndex}></Indicator>;
          })}
        </IndicatorLayout>
      </ImageLayout>
      <IconLayout>
        <IconButton>
          <img src={iconHeart} alt='하트 아이콘' />
          <span>58</span>
        </IconButton>
        <IconButton>
          <img src={iconChat} alt='채팅 아이콘' />
          <span>12</span>
        </IconButton>
      </IconLayout>
      <Content>
        얼마나 품고 바이며, 인간이 생생하며, 능히 위하여 이상은 위하여서 있는가? 이 창공에 인도하겠다는 갑 사막이다.
        동력은 힘차게 앞이 무한한 끓는 청춘의 지혜는 칼이다. 설산에서 목숨이 하였으며, 같은 착목한는 튼튼하며, 같이,
        이상 아니다. 찾아다녀도, 가는 이상의 교향악이다. 인간의 피가 못하다 돋고, 가진 열락의 풀밭에 사막이다. 고동을
        일월과 인생을 풍부하게 봄바람이다.
      </Content>
      <span>2023년 6월 14일</span>
    </Layout>
  );
};

const Layout = styled.article`
  padding: 14px 12px 60px 16px;
`;

const ImageLayout = styled.div`
  position: relative;
  width: calc(100% + 28px);
  height: 270px;
  margin: 4px -12px 6px -16px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  background: ${(props) => `url(${props.bgImage})`} no-repeat center;
`;

const IndicatorLayout = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Indicator = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${(props) => (props.onIndicator ? '#fff' : 'var(--gray)')};
  border-radius: 50%;
`;

const IconLayout = styled.div`
  display: flex;
  gap: 19px;
  margin: 12px 0 12px 0;
`;

const IconButton = styled.button`
  width: 39px;
  color: var(--gary);
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 15px;
    height: 15px;
  }

  span {
    font-size: var(--xs);
    color: var(--dark-gray);
  }
`;

const Content = styled.p`
  font-size: var(--sm);
  margin-bottom: 13px;
  line-height: 1.4;

  & + span {
    font-size: 10px;
    color: var(--dark-gray);
  }
`;

export default HomePostLayout;
