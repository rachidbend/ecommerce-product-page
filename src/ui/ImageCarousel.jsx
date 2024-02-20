/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import ImagesModal from './ImagesModal';

const StyledImageCarousel = styled.div`
  max-width: 100%;
  height: auto;
  border-radius: 1.6rem;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 1.6rem;
  cursor: pointer;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 3rem;
`;

const ThumbnailWrapper = styled.div`
  height: 8.8rem;
  width: 8.8rem;
  position: relative;
  border-radius: 0.6rem;
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

  &:hover {
    &::after {
      background-color: white;
    }
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  position: relative;
`;

function ImageCarousel({ images, thumbnails }) {
  // tracker of image selected to be viewed
  const [imageCount, setImageCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledImageCarousel>
      {/* 1. showcased image */}
      <Image
        src={`/public/${images[imageCount]}`}
        onClick={() => setIsModalOpen(true)}
      />
      {/* 2. thumbnails of other  */}
      <ThumbnailsContainer>
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailWrapper
            onClick={() => setImageCount(index)}
            active={index === imageCount ? 'true' : 'false'}
            key={`${thumbnail}`}
          >
            <Thumbnail src={`/public/${thumbnail}`} />
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
