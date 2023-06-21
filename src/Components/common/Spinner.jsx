import styled from 'styled-components';
import spinner from '../../Assets/icons/loading-spinner.png';

const Spinner = () => {
  return <LoadingSpinner src={spinner} />;
};

const LoadingSpinner = styled.img`
  display: block;
  width: 33px;
  height: 33px;
  margin: 10px auto;
  animation: spin 2s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
