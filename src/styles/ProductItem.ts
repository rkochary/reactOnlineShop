import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const ProductContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   width: '100%',
   height: '100%',
   padding: '0px 0px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
   }
}));

export const ProductContent = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   maxWidth: 420,
   padding: '30px'
}));

export const ProductImage = styled('img')(({ src, theme }) => ({
   src: `src(${src})`,
   width: '500px',
   height: '500px',
   [theme.breakpoints.down('md')]: {
      width: '350px'
   },
   [theme.breakpoints.down('sm')]: {
      width: '340px',
      height: '300px'
   }
}));

export const ProductTitle = styled(Typography)(() => ({
   lineHeight: 1.5,
   fontSize: '25px',
   marginBottom: '20px'
}));
