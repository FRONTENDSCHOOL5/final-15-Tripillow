import styled from 'styled-components';

const ErrorMSG = styled.p`
  color: ${(props) => (props.errorColor ? 'var(--error)' : 'var(--primary)')};
  margin-bottom: 16px;
  font-size: var(--xs);
`;

export default ErrorMSG;
