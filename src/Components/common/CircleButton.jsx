import React from 'react';
import styled from 'styled-components';
import upload from '../../Assets/icons/upload.svg';

const CircleButton = (props) => {
  const { type } = props;

  return <CircleButtonStyle type={type ? type : 'button'} {...props}></CircleButtonStyle>;
};

const CircleButtonStyle = styled.button`
  display: ${(props) => props.display || 'block'};
  width: ${(props) => props.width || '50px'};
  height: ${(props) => props.height || '50px'};
  position: ${(props) => props.position || 'absolute'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) => props.transform};
  background: ${(props) => `url(${props.bgUrl || upload}) no-repeat center/cover`};
`;

export default CircleButton;
