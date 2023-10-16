import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SearchContent from './SearchContent';
import isDesktop from 'Recoil/isDesktop/isDesktop';

const SearchModal = ({ isSearch, setIsSearch, setIconState }) => {
  const isPCScreen = useRecoilValue(isDesktop);
  const location = useLocation();

  const closeModal = () => {
    const path = location.pathname;
    setIsSearch(false);
    setIconState(path.slice(1).charAt(0).toUpperCase() + path.slice(2));
  };

  return (
    <PCBackground onClick={closeModal} isPCScreen={isPCScreen}>
      <PCSearchLayout onClick={(e) => e.stopPropagation()}>
        <SearchContent isSearch={isSearch} setIsSearch={setIsSearch} />
      </PCSearchLayout>
    </PCBackground>
  );
};

const PCBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: ${(props) => (props.isPCScreen ? '349px' : '94px')};
  z-index: 50;
`;

const PCSearchLayout = styled.article`
  width: 390px;
  position: fixed;
  top: 0;
  height: 100%;
  padding: 16px 16px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 4px 0px 5px;
  box-sizing: border-box;
  animation: fadeInModal 0.5s ease;
  overflow: auto;

  @keyframes fadeInModal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default SearchModal;
