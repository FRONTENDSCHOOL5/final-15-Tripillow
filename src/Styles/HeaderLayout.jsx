import styled from 'styled-components';

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  max-width: 390px;
  height: 48px;
  margin: 0 auto;
  padding: 0 12px 0 16px;
  border: 1px solid var(--light-gray);
  border-bottom: 0.5px solid var(--light-gray);
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

export default HeaderLayout;
