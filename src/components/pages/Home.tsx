//MUI
import { Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/Theme';
//Components
import Slider from '../Slider/Slider';

import { AboutImages, AboutContainer, AboutSlider, AboutImagesContainer } from '../../styles/About';

export default function Home() {
   return (
      <Box sx={{ background: '#1A202C' }}>
         <div
            className='headerInfo'
            style={{
               textTransform: 'uppercase',
               lineHeight: 0,
               textAlign: 'center',
               marginTop: '6rem',
               color: '#fff'
            }}
         >
            <h1 style={{ fontSize: '8rem', opacity: '0.3' }}>About</h1>
            <h6 style={{ fontSize: '1.5rem', fontWeight: 300 }}>Store</h6>
         </div>
         <AboutContainer>
            <AboutSlider>
               <AboutImagesContainer sx={{ '--i': '1;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/dc/9c/75/dc9c75cfcb29d43ce0bec184939f6291.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '2;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/db/31/5e/db315eeaad2c720444309769a9c5ae3e.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '3;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/52/48/90/52489013b3f70ac5a37c9bbf57f57c37.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '4;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/47/89/37/4789371da93d6aac7bfce133d26fb318.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '5;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/24/a3/e7/24a3e7c78fb02bffb3747017b80ec8b0.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '6;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/28/07/b3/2807b3fd25b872be8772128bdc354328.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '7;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/4e/0d/93/4e0d93b8334ccc2bc926dac3a14fd497.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
               <AboutImagesContainer sx={{ '--i': '8;' }}>
                  <AboutImages
                     src='https://i.pinimg.com/564x/dd/a6/2a/dda62a139cf181ac45236d3e9203cd8a.jpg'
                     alt='member'
                  />
               </AboutImagesContainer>
            </AboutSlider>
         </AboutContainer>
         <ThemeProvider theme={theme}>
            <Container
               maxWidth='xl'
               sx={{
                  minHeight: '100vh',
                  background: '#1A202C'
               }}
            >
               <div
                  className='headerSlider'
                  style={{
                     textTransform: 'uppercase',
                     lineHeight: 0,
                     textAlign: 'center',
                     marginBottom: '6rem',
                     color: '#fff'
                  }}
               >
                  <h1 style={{ fontSize: '5rem', opacity: '0.3' }}>Products</h1>
                  <h6 style={{ fontSize: '1rem', fontWeight: 300 }}>what do we offer</h6>
               </div>
               <Slider />
            </Container>
         </ThemeProvider>
      </Box>
   );
}
