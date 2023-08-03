import styled, { css } from 'styled-components';

const LayoutStyle = css`
  max-width: 390px;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 48px 0 73px;
`;

const Layout = styled.div`
  ${LayoutStyle}
`;

export { Layout, LayoutStyle };
