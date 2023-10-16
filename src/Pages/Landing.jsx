import React from 'react';
import Landings from 'Components/Landing/Landings';
import MetaTag from 'Components/common/MetaTag';

const Landing = () => {
  return (
    <>
      <MetaTag
        title='Tripillow'
        description='Tripillow는 여행 경험을 공유하고, 개인 간의 여행용품과 외화를 거래하는 SNS 플랫폼입니다. 다양한 사람들과의 여행 경험을 공유해요'
        url='https://tripillow.netlify.app/'
      />
      <Landings />
    </>
  );
};

export default Landing;
