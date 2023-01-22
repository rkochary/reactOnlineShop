//MUI
import { Box, Card, Grid, List, ListItemText, Typography } from '@mui/material';
//Styles
import { FooterTitle } from './styles';
//Components
import SocialNetwork from '../About/socialNetwork/SocialNetwork';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
   const navigate = useNavigate();
   const { t } = useTranslation();

   const handleNavigate = () => {
      navigate('/about');
   };

   return (
      <>
         <Box
            sx={{
               marginTop: 'auto',
               background: '#212834',
               color: 'white',
               p: { xs: 4, md: 10 },
               pt: 12,
               pb: 12,
               fontSize: { xs: '12px', md: '14px' }
            }}
         >
            <Grid container spacing={2} justifyContent={'center'}>
               <Grid item md={6} lg={4}>
                  <FooterTitle variant='body1'>{t('about')}</FooterTitle>
                  <Typography variant='caption'>{t('textAbout')}</Typography>
                  <Box>
                     <br />
                     <h2>{t('socnet')}</h2>
                     <br />
                     <SocialNetwork />
                     <br />
                  </Box>
                  <Box>
                     <h1 style={{ cursor: 'pointer' }} onClick={handleNavigate}>
                        {t('faq')}
                     </h1>
                  </Box>
               </Grid>
               <Grid item md={6} lg={2}>
                  <FooterTitle variant='body1'>{t('category')}</FooterTitle>
                  <List>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           {t('watches')}
                        </Typography>
                     </ListItemText>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           {t('jewelleries')}
                        </Typography>
                     </ListItemText>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           {t('accessories')}
                        </Typography>
                     </ListItemText>
                  </List>
               </Grid>
               <Grid item md={6} lg={2}>
                  <FooterTitle variant='body1'>{t('contact')}</FooterTitle>
                  <List>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           (000) - 00 - 00 - 00
                        </Typography>
                     </ListItemText>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           (111) - 11 - 11 - 11
                        </Typography>
                     </ListItemText>
                     <ListItemText>
                        <Typography variant='caption' lineHeight={2}>
                           (222) - 22 - 22 - 22
                        </Typography>
                     </ListItemText>
                  </List>
               </Grid>
               <Grid item md={6} lg={2}>
                  <Card
                     sx={{
                        width: 300,
                        marginTop: '-50px',
                        padding: '1px',
                        border: '3px solid #212834',
                        background: 'rgba(33,40,52,0.1)'
                     }}
                  >
                     <iframe
                        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6094.943834279641!2d44.4880679!3d40.1985643!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce69a1b0d77%3A0x31ea9da813693c2e!2sACA(Armenian%20Code%20Academy)!5e0!3m2!1sru!2s!4v1629828235012!5m2!1sru!2s'
                        width={300}
                        height={300}
                        allowFullScreen
                     ></iframe>
                  </Card>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default Footer;
