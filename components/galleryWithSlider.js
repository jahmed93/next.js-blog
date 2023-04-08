import Gallery from "react-photo-gallery";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const MainContainer = styled.div`
  margin: 10em 1em 10em 3em;
  @media (max-width: 768px) {
    margin: 10em 0em 1em 2em;
  }
`;

const Content = styled.div`
  width: 0;
  opacity: 0;
  transition: 0.4s;
  position: relative;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #0000009e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  h3 {
    font-weight: 500;
    font-size: 2em;
    margin: 0;
    padding: 0;
    text-transform: capitalize;
    @media (max-width: 768px) {
      font-size: 1.2em;
    }
  }
`;
const ImageContainer = styled(motion.div)`
  position: relative;
  &:hover {
    > div {
      width: 100%;
      opacity: 1;
      overflow: hidden;
    }
  }
`;

const SliderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffffd9;
  z-index: 99;
  padding: 3em 1em;
  .slider {
    height: 100%;
  }
  .previous {
    opacity: 0;
    transition: opacity 1s;
  }
  .next {
    opacity: 0;

    transition: opacity 1s;
  }
  .current {
    transition: 0.2s;
  }
`;

const NextButton = styled.svg`
  @media (max-width: 768px) {
    display: none;
  }
`;

const PrevButton = styled.svg`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  font-size: 2em;
  svg {
    height: 30px;
    cursor: pointer;
  }
`;

// Components
const ImageComponent = ({
  photo,
  top,
  left,
  title,
  description,
  index,
  onClick,
}) => {
  const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    console.log(inView);
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const animationVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 100 },
  };

  const styles = {
    position: "absolute",
    left: left,
    top: top,
    cursor: "zoom-in",
    width: photo.width,
    height: photo.height,
  };

  return (
    <ImageContainer
      onClick={() => onClick(index)}
      style={styles}
      ref={ref}
      variants={animationVariant}
      initial="hidden"
      animate={control}
    >
      <Content>
        <h3 style={{ width: photo.width }}>{title}</h3>
        <p style={{ width: photo.width }}>{description}</p>
      </Content>
      <Image
        style={{ objectFit: "cover" }}
        fill
        sizes=""
        src={photo.src}
        alt={photo.title}
      />
    </ImageContainer>
  );
};

const GalleryWithSlider = ({ photos }) => {
  const [sliderIndex, setSliderIndex] = useState(null);
  const [columnsNum, setColumnsNum] = useState(null);
  const handleClick = (index) => {
    setSliderIndex(index);
  };
  const handleColumns = (containerWidth) => {
    let columns = 1;
    if (containerWidth >= 576) columns = 2;
    if (containerWidth >= 768) columns = 3;
    if (containerWidth >= 995) columns = 4;
    setColumnsNum(columns);
    return columns;
  };
  const imageRenderer = ({ left, top, key, photo, index }) => (
    <ImageComponent
      index={index}
      key={key}
      photo={photo}
      left={left}
      top={top}
      title={photos[index].title}
      description={photos[index].description}
      onClick={handleClick}
    />
  );

  return (
    <MainContainer>
      <Gallery
        renderImage={imageRenderer}
        margin={15}
        photos={photos}
        columns={handleColumns}
        direction={"column"}
      />
      {sliderIndex !== null && (
        <SliderContainer>
          <Slider
            duration={300}
            slideIndex={sliderIndex}
            nextButton={
              <NextButton
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
              </NextButton>
            }
            previousButton={
              <PrevButton
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
              </PrevButton>
            }
            touchDisabled={false}
          >
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo.src}
                width={100}
                height={100}
                sizes="100vw"
                style={{ objectFit: "contain" }}
                alt="alt"
              />
            ))}
          </Slider>
          <Close onClick={() => setSliderIndex(null)}>
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
            </svg>
          </Close>
        </SliderContainer>
      )}
    </MainContainer>
  );
};

export default GalleryWithSlider;
