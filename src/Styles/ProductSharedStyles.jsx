import styled from 'styled-components';
import Input from 'Components/common/Input';

export const Label = styled.label`
  display: block;
  width: calc(100% + 16px + 12px);
  min-height: 232px;
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 14px;
  cursor: pointer;
`;

export const SecondInput = styled(Input)`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ProductText = styled.textarea.attrs({
  placeholder: '제품에 대한 설명을 입력해주세요!',
})`
  width: 100%;
  min-height: ${(props) => (props.$isWideView ? '340px' : '140px')};
  margin-top: 12px;
  padding: 10px;
  resize: none;
  border: 1px solid var(--light-gray);
  font-size: ${(props) => (props.$isWideView ? 'var(--lg)' : 'var(--sm)')};
  box-sizing: border-box;

  ::placeholder {
    color: var(--light-gray);
  }
  &:focus {
    border: 1px solid var(--primary);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CategoryTxt = styled.div`
  color: var(--dark-gray);
  font-size: var(--xs);
  margin-bottom: 10px;
`;
