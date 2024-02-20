import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const Overlay = styled.div`
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  height: 100svh;
  width: 100%;
  background-color: var(--color-background-overlay);
  /* opacity: 0.6; */

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(10px);
`;

const StyledImagesModal = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseIcon = styled(FaTimes)`
  height: 2.8rem;
  width: auto;
  color: var(--color-white);
  align-self: flex-end;
  padding: 0.4rem;
  cursor: pointer;
  margin-bottom: 2rem;
  &:hover {
    color: var(--color-orange-100);
  }
`;

const MainImage = styled.img`
  width: 55rem;
  height: auto;
  border-radius: 1.2rem;
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

const MainImageCOntainer = styled.div`
  position: relative;
`;

const ArrowForwardContainer = styled.div`
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
`;
const ArrowForward = styled(IoIosArrowForward)`
  height: 2.4rem;
  width: auto;
  color: inherit;
`;
const ArrowBackContainer = styled.div`
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
  &:hover {
    color: var(--color-orange-100);
  }
`;
const ArrowBack = styled(IoIosArrowBack)`
  height: 2.4rem;
  width: auto;
  color: inherit;
`;

function ImagesModal({ images, thumbnails, initialImage, onClosemodal }) {
  const [count, setCount] = useState(initialImage && 0);

  const handleForward = () => {
    if (count === images?.length - 1) {
      setCount(count => 0);
    } else {
      setCount(count => count + 1);
    }
  };

  const handleBack = () => {
    if (count === 0) {
      setCount(images?.length - 1);
    } else {
      setCount(count => count - 1);
    }
  };

  return createPortal(
    <Overlay>
      <StyledImagesModal>
        <CloseIcon onClick={onClosemodal} />
        <MainImageCOntainer>
          <ArrowBackContainer onClick={handleBack}>
            <ArrowBack />
          </ArrowBackContainer>
          <MainImage src={`/public/${images[count]}`} />
          <ArrowForwardContainer onClick={handleForward}>
            <ArrowForward />
          </ArrowForwardContainer>
        </MainImageCOntainer>
        <ThumbnailsContainer>
          {thumbnails.map((thumbnail, index) => (
            <ThumbnailWrapper
              onClick={() => setCount(index)}
              active={index === count ? 'true' : 'false'}
              key={`${thumbnail}`}
            >
              <Thumbnail src={`/public/${thumbnail}`} />
            </ThumbnailWrapper>
          ))}
        </ThumbnailsContainer>
      </StyledImagesModal>
    </Overlay>,
    document.body
  );
}

export default ImagesModal;
