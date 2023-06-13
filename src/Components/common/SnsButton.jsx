import React from 'react'
import styled, {css} from 'styled-components'

export default function SnsButton(props) {
  return (
    <Button >{props.children}</Button>
  )
}

const Button = styled.button`
  border-radius: 44px;
  background-color: #8fb2d0;
  /* 크기 이렇게 정하는게 맞나 */
  padding: 13px 87px;
  border-color: ${props=> props.borderColor};

  ${props => props.kakao && css`
    border: 1px solid yellow;   
  `}

  ${props => props.google && css`
  border: 1px solid yellow;
  `}

  ${props => props.facebook && css`
    border: 1px solid royalblue;
  `}
`

// <button kakao></button>