import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import URL from '../../Utils/URL';
import defaultImg from '../../Assets/defaultImg.png';
import imgLayer from '../../Assets/icons/icon-img-layers.svg';

const ViewImage = (props) => {
  const navigate = useNavigate();
  const longImages = props.post.image.split(', ');
  const images = props.post.image.split(', ').pop();

  const handleError = (e) => {
    e.target.src = defaultImg;
  };

  const handlePostClick = () => {
    navigate(`/post/${props.post.id}`);
  };

  return (
    <ImageLayout onClick={handlePostClick}>
      {longImages.length > 1 && <ImageLayerLayout />}
      <img src={`${URL}/${images}`} onError={handleError} alt={props.post.content} />
    </ImageLayout>
  );
};

const ImageLayout = styled.div`
  position: relative;
  width: 114px;
  height: 114px;
  overflow: hidden;
  margin-bottom: 8px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageLayerLayout = styled.div`
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  background: url(${imgLayer}) no-repeat center center;
`;

export default ViewImage;
