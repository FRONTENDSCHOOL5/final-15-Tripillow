import React from "react";
import styled, { css } from "styled-components";

// props는 객체다.
const Button = (props) => {
  const { type } = props;

  return (
    <ButtonStyle type={type ? type : "button"} {...props}>
      {props.children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "green")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};

  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};

  ${(props) =>
    props.smallBtn &&
    css`
      background-color: red;
      color: white;
      font-size: 12px;
    `}
`;

export default Button;
