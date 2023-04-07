import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const Image = ({ src, alt }) => {
  return (
    <div style={{ overflow: 'hidden'}}>
      <StyledImage src={src} alt={alt} />
    </div>
  );
};

export default Image;