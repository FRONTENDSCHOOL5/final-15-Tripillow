import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import URL from 'Api/URL';
import arrowRight from 'Assets/icons/icon-arrow-right.svg';
import arrowLeft from 'Assets/icons/icon-arrow-left.svg';
import defaultImg from 'Assets/defaultImg.png';
import ImageModal from 'Components/common/Modal/ImageModal';

export default function PostImage({ post }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pictures = post.image.split(', ');
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const $onModal = document.getElementById('OnModal');
  const [isModalOn, setIsModalOn] = useState(false);
  const imgSrc = URL + '/' + pictures[currentIndex];

  const handleClick = () => {
    setIsModalOn(true);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.clientX);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setEndX(touch.clientX);
  };

  const handleTouchEnd = () => {
    if (pictures.length === 1) {
      return;
    }
    if (startX && endX) {
      const distance = endX - startX;
      if (distance > 75) {
        handleNext();
      } else if (distance < -75) {
        handlePrev();
      }
      setStartX(null);
      setEndX(null);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  const handleError = (e) => {
    e.target.src = defaultImg;
  };
  return (
    <>
      <ImageLayout
        id='postImage-layout'
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {pictures.length > 1 && pictures[0] !== pictures[currentIndex] && (
          <ArrowButton onClick={handlePrev} bgImage={arrowLeft} left='16px'></ArrowButton>
        )}
        <img src={URL + '/' + pictures[currentIndex]} onError={handleError} alt='' />
        {pictures.length > 1 && pictures[pictures.length - 1] !== pictures[currentIndex] && (
          <ArrowButton onClick={handleNext} bgImage={arrowRight} right='16px'></ArrowButton>
        )}
        <IndicatorLayout>
          {pictures.length > 1 &&
            pictures.map((_, index) => {
              return <Indicator key={index} indicator={index === currentIndex}></Indicator>;
            })}
        </IndicatorLayout>
      </ImageLayout>
      {isModalOn && createPortal(<ImageModal setIsModalOn={setIsModalOn} imgSrc={imgSrc} />, $onModal)}
    </>
  );
}

const ImageLayout = styled.div`
  position: relative;
  width: calc(100% + 28px);
  height: 270px;
  margin: 4px -12px 6px -16px;
  cursor: pointer;

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
  background-color: ${(props) => (props.indicator ? '#fff' : 'var(--gray)')};
  border-radius: 50%;
`;
