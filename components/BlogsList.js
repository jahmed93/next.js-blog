import styled, {keyframes} from 'styled-components';
import data from "@/public/meta.json";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 40px;
  }

  @media (min-width: 1200px) {
    padding: 0 80px;
  }
`;

const fadeinup = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Column = styled.div`
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  transform: translateY(20px);
  animation: ${fadeinup} 0.5s ease-out forwards;
`;

const BlogImage = styled.img`
	width: 100%;
`;

const Title = styled.div`
	margin-top: 20px;
	padding: 0 20px;
	font-weight: 400;
  letter-spacing: .15625em;
  font-size: 1.6rem;
  line-height: 1.2;
`;

const Description = styled.p`
	font-weight: 300;
  color: dimgray;
  padding: 0 20px;
`;

const BlogsList = ({ children }) => {
  return (
    <Container>
    	{(data?.plugins ?? []).map((plugin) => (
        <Column key={plugin.id}>
        	<BlogImage src={plugin.image} />
          <Title>{plugin.name}</Title>
          <Description>{plugin.description}</Description>
        </Column>
      ))}
    </Container>
  );
};

export default BlogsList;
