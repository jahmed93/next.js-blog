import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import data from "@/public/meta.json";
import Image from '@/components/Image';
import Grid from '@/components/Grid';

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

const Item = styled(motion.div)`
	margin: 10px;
	border-left: 1px solid #ddd;
	grid-column: span ${props => props.span};
`;

const Column = ({ children, index, span }) => {
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

  const delay = (index < 3) ? (index * 0.2) : (index + 2 % 3) * 0.1

  const animationVariant = {
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
		hidden: { opacity: 0, y: 100 }
	}

  return (
    <Item
      ref={ref}
      span={span}
      variants={animationVariant}
      initial="hidden"
      animate={control}
    >
      {children}
    </Item>
  );
}

const BlogsList = () => {

  return (
    <Grid>
    	{(data?.plugins ?? []).map((plugin, index) => {
    		return (
	        <Column key={plugin.id} index={index} span={index === 0 ? 2 : 1}>
	        	<Image src={plugin.image} alt="plugin.title" />
	          <Title>{plugin.name}</Title>
	          <Description>{plugin.description}</Description>
	        </Column>
        )
      })}
    </Grid>
  );
};

export default BlogsList;
