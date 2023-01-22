import React, { useEffect, useState } from 'react';

import { SliderContainer, SliderImages } from './styles';
import { Box, Slide } from '@mui/material';

const slideImages = [
   { src: '/images/slider/sliderOne.jpg' },
   { src: '/images/slider/sliderTwo.jpg' },
   { src: '/images/slider/sliderThree.jpg' }
];

const Slider = () => {
   const [slideImagesIndex, setSlideImagesIndex] = useState<number>(0);
   const [show, setShow] = useState<boolean>(true);

   useEffect(() => {
      setTimeout(() => {
         setShow(false);
      }, 3000);

      const intervalID = setInterval(() => {
         setSlideImagesIndex((i) => (i + 1) % slideImages.length);
         setShow(true);

         setTimeout(() => {
            setShow(false);
         }, 3000);
      }, 4000);

      return () => {
         clearInterval(intervalID);
      };
   }, []);

   return (
      <SliderContainer>
         <Slide direction={show ? 'left' : 'right'} in={show} timeout={{ enter: 500, exit: 500 }}>
            <Box display='flex' justifyContent='center' alignItems={'center'}>
               <SliderImages src={slideImages[slideImagesIndex].src} />
            </Box>
         </Slide>
      </SliderContainer>
   );
};

export default Slider;
