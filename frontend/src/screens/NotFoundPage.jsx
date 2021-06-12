import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NotFoundPage = () => (
  <Container className="text-center">
    <h1>
      NotFound
    </h1>
    <div>
      <Link to='/signin' className="register-link"> Back home!</Link>
    </div>
  </Container>
);

export default NotFoundPage
