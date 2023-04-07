import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  width: 100%;
  margin: 50px auto;

  @media (min-width: 576px) {
    max-width: 540px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
     max-width: 1140px;
  }
`;

export default Grid;