import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
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

const Column = ({ children, delay }) => {
	const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const animationVariant = {
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
		hidden: { opacity: 0, y: 100 }
	}

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={animationVariant}
      initial="hidden"
      animate={control}
    >
      {children}
    </motion.div>
  );
}

const BlogsList = () => {

  return (
    <Container>
    	{(data?.plugins ?? []).map((plugin, index) => {
    		return (
	        <Column key={plugin.id} delay={(index % 3) * 0.2}>
	        	<BlogImage src={plugin.image} />
	          <Title>{plugin.name}</Title>
	          <Description>{plugin.description}</Description>
	        </Column>
        )
      })}
    </Container>
  );
};

export default BlogsList;