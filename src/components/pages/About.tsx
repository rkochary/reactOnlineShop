//MUI
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TypewriterComponent from 'typewriter-effect';
import AccordionPage from '../About/accordion/Accordion';
import LinearProgress from '@mui/material/LinearProgress';

export default function About() {
   const { t } = useTranslation();

   return (
      <>
         <Box style={{ background: '#1A202C' }}>
            <div
               style={{
                  textTransform: 'uppercase',
                  lineHeight: 0,
                  textAlign: 'center',
                  marginTop: '6rem',
                  color: '#fff'
               }}
            >
               <h1 style={{ fontSize: '5rem', opacity: '0.6', color: '#5082FC' }}>
                  <TypewriterComponent
                     options={{
                        autoStart: true,
                        loop: true
                     }}
                     onInit={(typewriter) => {
                        typewriter.typeString('Definition').pauseFor(2000).deleteAll().start();
                     }}
                  />
               </h1>
            </div>
            <Container>
               <div
                  style={{
                     marginTop: '100px',
                     color: 'white',
                     fontSize: '20px',
                     letterSpacing: '1px'
                  }}
               >
                  {t('textAbout')}
                  {t('textAbout')}
                  {t('textAbout')}
                  {t('textAbout')}
                  {t('textAbout')}
               </div>
               <br />
               <div
                  style={{
                     textTransform: 'uppercase',
                     lineHeight: 0,
                     textAlign: 'center',
                     marginTop: '6rem',
                     color: '#fff',
                     display: 'flex',
                     justifyContent: 'center',
                     flexDirection: 'column',
                     alignItems: 'center'
                  }}
               >
                  <h1
                     style={{
                        fontSize: '5rem',
                        opacity: '0.6',
                        color: 'white',
                        letterSpacing: '10px'
                     }}
                  >
                     FAQ
                  </h1>
                  <Box sx={{ width: '200px', marginTop: '50px', marginLeft: '-10px' }}>
                     <LinearProgress />
                  </Box>
               </div>
               <AccordionPage />
            </Container>
         </Box>
      </>
   );
}
