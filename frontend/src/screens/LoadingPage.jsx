import React from 'react';
import styled from 'styled-components';

import loading from './../assets/img/logo.svg';

const Container = styled.div`
  width: 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 150px;
    max-height: 150px;
  }
`;

const LoadingPage = () => (
  <Container>
    <img src={loading} alt="app loading"/>
  </Container>
);

export default LoadingPage
