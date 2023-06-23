import React from 'react';
import styled from 'styled-components';
import URL from '../../Utils/URL';

const ViewImage = (props) => {
  const images = props.post.image.split(', ').pop();
  return (
    <ImageLayout>
      <img src={`${URL}/${images}`} alt={props.post.content} />
    </ImageLayout>
  );
};

const ImageLayout = styled.div`
  width: 114px;
  height: 114px;
  overflow: hidden;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ViewImage;
