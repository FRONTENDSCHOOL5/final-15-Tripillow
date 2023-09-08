import { Layout } from 'Styles/Layout';
import Navbar from 'Components/common/Navbar';
import SearchContent from './SearchContent';
import useIsWideView from 'Components/SideNav/useIsWideView';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const isWideView = useIsWideView();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isWideView && location.pathname === '/search') {
      navigate('/home');
    }
  }, [isWideView, location, navigate]);

  return (
    !isWideView && (
      <Layout>
        <SearchContent header />
        <Navbar />
      </Layout>
    )
  );
};

export default Search;
