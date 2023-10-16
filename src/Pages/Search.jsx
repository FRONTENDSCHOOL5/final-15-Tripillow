import { Layout } from 'Styles/Layout';
import Navbar from 'Components/common/Navbar';
import SearchContent from 'Components/Search/SearchContent';
import useIsWideView from 'Components/SideNav/useIsWideView';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MetaTag from 'Components/common/MetaTag';

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
      <>
        <MetaTag
          title='Tripillow 검색'
          description='다른 pillower들을 검색하여 다양한 여행 기록과 여행 상품을 살펴보세요'
          url='https://tripillow.netlify.app/search'
        />
        <Layout>
          <SearchContent header />
          <Navbar />
        </Layout>
      </>
    )
  );
};

export default Search;
