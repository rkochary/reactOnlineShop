import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const SliderContainer = styled(Box)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      padding: '40px 0px 40px 0px'
   },
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '20px 0px 20px 0px',
   overflow: 'hidden'
}));

export const SliderImages = styled('img')(({ src, theme }) => ({
   src: `url(${src})`,
   width: '100%',
   [theme.breakpoints.down('md')]: {
      width: '55%'
   },
   [theme.breakpoints.down('sm')]: {
      width: '45%'
   },
   borderRadius: '8px',
   marginBottom: '10px'
}));
