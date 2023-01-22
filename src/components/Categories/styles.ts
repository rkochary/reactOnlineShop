//MUI
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { animate, secondAnimate } from '../../animation';

export const Category = styled(Box)(() => ({
   position: 'relative',
   width: '350px',
   height: '380px',
   background: '#fff',
   '&:hover .category-name': {
      color: '#3778C2'
   }
}));

export const CategoryContent = styled(Box)(() => ({
   position: 'absolute',
   inset: 0,
   background: '#000',
   overflow: 'hidden',
   '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '600px',
      height: '120px',
      background: 'linear-gradient(transparent,#2196f3,#2196f3,#2196f3,transparent)',
      animation: `${animate} 6s linear infinite`
   },
   '&:after': {
      content: '""',
      position: 'absolute',
      inset: '2px',
      background: '#212834'
   }
}));

export const CategoryImageBox = styled(Box)(() => ({
   position: 'absolute',
   top: '-50px',
   left: '50%',
   transform: 'translateX(-50%)',
   width: '250px',
   height: '250px',
   background: '#000',
   overflow: 'hidden',
   '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '500px',
      height: '150px',
      transform: 'translate(-50%,-50%)',
      background: 'linear-gradient(transparent,#ff3c7b,#ff3c7b,#ff3c7b,transparent)',
      animation: `${secondAnimate} 4s linear infinite`
   },
   '&:after': {
      content: '""',
      position: 'absolute',
      inset: '2px',
      background: '#212834'
   }
}));

export const CategoryImage = styled('img')(() => ({
   position: 'absolute',
   top: '10px',
   left: '10px',
   width: 'calc(100% - 20px)',
   height: 'calc(100% - 20px)',
   zIndex: 1
}));

export const CategoryInfo = styled(Box)(() => ({
   position: 'absolute',
   width: '100%',
   height: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'flex-end'
}));

export const CategoryDetail = styled(Typography)(({ theme }) => ({
   padding: '40px',
   textAlign: 'center',
   fontFamily: 'Aboreto',
   color: '#5082FC',
   textTransform: 'uppercase',
   [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      fontWeight: 'bold'
   }
}));
