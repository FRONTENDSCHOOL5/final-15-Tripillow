import styled, { css } from 'styled-components';

const LayoutStyle = css`
  margin: 0 auto;
  padding: 48px 0 73px;
  max-width: 390px;
  border: 1px solid var(--light-gray);
  min-height: 100%;
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
