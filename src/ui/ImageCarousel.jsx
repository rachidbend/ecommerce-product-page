/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import ImagesModal from './ImagesModal';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const StyledImageCarousel = styled.div`
  max-width: 100%;
  height: auto;
  border-radius: 1.6rem;

  @media screen and (max-width: 600px) {
    width: 100%;
    border-radius: 0rem;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ThumbnailWrapper = styled.div`
  height: 8.8rem;
  width: 8.8rem;
  position: relative;
  border-radius: 1rem;
  border: 0.2rem solid
    ${props =>
      props.active == 'true' ? 'var(--color-orange-100)' : 'transparent'};
  overflow: hidden;
  cursor: pointer;
  transition: border 0.3s ease;
  &::after {
    content: '';
    background-color: ${props =>
      props.active == 'true' ? 'white' : 'transparent'};
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 50%;
    transition: background 0.3s ease;
  }

  &:hover::after {
    background-color: white;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 1.6rem;

  @media screen and (max-width: 600px) {
    border-radius: 0rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  cursor: pointer;
  transition: left 0.3s ease;
  position: absolute;
  left: ${props => props.position};
`;

// **************************************
const ArrowBackContainer = styled.div`
  display: none;
  padding: 1.6rem;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 5rem;
  transform: translate(-50%, -50%);
  color: var(--color-blue-100);
  transition: color 0.3s ease;
  cursor: pointer;
  text-align: center;
  z-index: 999;
  &:hover {
    color: var(--color-orange-100);
  }

  @media screen and (max-width: 600px) {
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    left: 3.6rem;
  }
`;

const ArrowBack = styled(IoIosArrowBack)`
  height: 2.4rem;
  width: auto;
  color: inherit;
  @media screen and (max-width: 600px) {
    height: 1.4rem;
  }
`;

const ArrowForward = styled(IoIosArrowForward)`
  height: 2.4rem;
  width: auto;
  color: inherit;

  @media screen and (max-width: 600px) {
    height: 1.4rem;
  }
`;

const ArrowForwardContainer = styled.div`
  display: none;

  padding: 1.6rem;
  background-color: white;
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 5rem;
  transform: translate(50%, -50%);
  color: var(--color-blue-100);
  transition: color 0.3s ease;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: var(--color-orange-100);
  }

  @media screen and (max-width: 600px) {
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    right: 3.6rem;
  }
`;

function ImageCarousel({ images, thumbnails }) {
  // State to track the selected image
  const [imageCount, setImageCount] = useState(0);
  // State to manage the modal's open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for clicking on an image
  function handleImageClick() {
    if (window.innerWidth < 600) return;
    setIsModalOpen(true);
  }

  const handleForward = () => {
    if (imageCount === images?.length - 1) {
      setImageCount(imageCount => 0);
    } else {
      setImageCount(imageCount => imageCount + 1);
    }
  };

  const handleBack = () => {
    if (imageCount === 0) {
      setImageCount(images?.length - 1);
    } else {
      setImageCount(imageCount => imageCount - 1);
    }
  };
  console.log(thumbnails);
  return (
    <StyledImageCarousel>
      {/* 1. showcased image */}

      <ImageContainer>
        <ArrowBackContainer onClick={handleBack}>
          <ArrowBack />
        </ArrowBackContainer>
        {images.map((image, index) => (
          <Image
            /* the index - imageCount is what defines the position of each image*/
            position={`${(index - imageCount) * 100}%`}
            key={`image-${image}`}
            src={`${image}`}
            onClick={handleImageClick}
          />
        ))}
        <ArrowForwardContainer onClick={handleForward}>
          <ArrowForward />
        </ArrowForwardContainer>
      </ImageContainer>
      {/* 2. thumbnails  */}
      <ThumbnailsContainer>
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailWrapper
            onClick={() => setImageCount(index)}
            active={index === imageCount ? 'true' : 'false'}
            key={`${thumbnail}`}
          >
            <Thumbnail src={`${thumbnail}`} />
          </ThumbnailWrapper>
        ))}
      </ThumbnailsContainer>

      {isModalOpen && (
        <ImagesModal
          images={images}
          thumbnails={thumbnails}
          initialImage={imageCount}
          onClosemodal={() => setIsModalOpen(false)}
        />
      )}
    </StyledImageCarousel>
  );
}

export default ImageCarousel;
