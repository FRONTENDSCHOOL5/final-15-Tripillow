import styled, { css } from 'styled-components';

const LayoutStyle = css`
  max-width: 390px;
  min-height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 48px 0 73px;
  border: 1px solid var(--light-gray);
`;

const Layout = styled.div`
  ${LayoutStyle}
`;

export { Layout, LayoutStyle };

// const Layout = styled.div`
//   margin: 0 auto;
//   max-width: 390px;
//   border: 1px solid var(--light-gray);
//   height: 100%;

// `;

// export default Layout;
