import React from "react";
import styled from "styled-components";
import Button from "../Components/common/Button";
import Layout from "../Components/common/Layout";

const Home = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <div>
        <Button type='submit'>홈입니다</Button>
        <Button
          type='submit'
          disabled
          bgColor='white'
          fontSize='24px'
          font-weight='400'
        >
          홈입니다
        </Button>
        <Button smallBtn fontWeight='700'>
          하잉
        </Button>
        <HomeLayout>
          <p>배고파잉</p>
        </HomeLayout>
      </div>
      <div>
        <p>하잉</p>
      </div>
    </Layout>
  );
};

const HomeLayout = styled(Layout)`
  background: red;

  div {
    margin: 20px;
  }

  p {
    font-size: 18px;
  }
`;

const DivStyled = styled.div`
  margin: 20px;
`;

export default Home;
