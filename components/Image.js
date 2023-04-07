import styled from 'styled-components';

const StyledImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 250px;
  transition: transform 0.2s ease-in-out;
  position: relative;
  display: inline-block;

  @media (min-width: 992px) {
    height: 350px;
  }

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Image = ({ src, alt }) => {
  return (
    <StyledImageContainer>
      <StyledImage src={src} alt={alt} />
    </StyledImageContainer>
  );
};

export default Image;