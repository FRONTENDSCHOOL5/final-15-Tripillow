import styled, { css } from 'styled-components';
import Share from '../../Assets/icons/icon-share.svg';

export const UserProfileLayout = styled.article`
  display: ${(props) => (props.$pc ? 'flex' : 'block')};
  gap: ${(props) => (props.$pc ? '20px' : 'none')};
  margin: 0 auto;
  padding: 30px 12px 26px 16px;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
`;

export const ImgLayout = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Icon

export const IconBox = css`
  width: 34px;
  height: 34px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
`;

export const ShareIconStyle = styled.button`
  ${IconBox}
  background: url(${Share}) no-repeat center;
`;
