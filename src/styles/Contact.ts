import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ContactContainer = styled(Box)(() => ({
   minHeight: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: '#f7f4ff',
   perspective: '1000px'
}));

export const Book = styled(Box)(({ theme }) => ({
   display: 'flex',
   marginRight: '300px',
   alignItems: 'center',
   cursor: 'pointer',
   '&:hover .bookCover': {
      transform: 'rotateX(10deg) rotateY(-180deg)'
   },
   '&:hover .page': {
      transform: 'rotateX(10deg) rotateY(-180deg)',
      zIndex: 2
   },
   '&:hover .page:nth-of-type(2)': {
      transitionDuration: '6s'
   },
   '&:hover .page:nth-of-type(3)': {
      transitionDuration: '5.6s'
   },
   '&:hover .page:nth-of-type(4)': {
      transitionDuration: '5.2s'
   },
   '&:hover .page:nth-of-type(5)': {
      transitionDuration: '4.5s'
   },
   '&:hover .page:nth-of-type(6)': {
      transitionDuration: '4.4s'
   },
   [theme.breakpoints.down('md')]: {
      display: 'none'
   }
}));

export const AlternativeMenu = styled(Box)(({ theme }) => ({
   width: '360px',
   height: '80px',
   display: 'flex',
   justifyContent: 'space-evenly',
   alignItems: 'center',
   [theme.breakpoints.up('md')]: {
      display: 'none'
   }
}));

export const BookCover = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   height: '300px',
   width: '260px',
   backgroundColor: '#212834',
   borderRadius: '2px 20px 20px 2px',
   position: 'absolute',
   boxShadow: '1px 1px 10px gray',
   transform: 'rotateX(10deg)',
   transformOrigin: 'center left',
   zIndex: 1,
   transition: 'all 3s'
}));

export const Page = styled(Box)(() => ({
   height: '280px',
   width: '250px',
   backgroundColor: '#e5cf9e',
   position: 'absolute',
   borderRadius: '2px 10px 10px 2px',
   transform: 'rotateX(10deg)',
   transformOrigin: 'center left',
   zIndex: -1,
   ':nth-of-type(2)': {
      transitionDuration: '3s'
   },
   ':nth-of-type(3)': {
      transitionDuration: '2.6s'
   },
   ':nth-of-type(4)': {
      transitionDuration: '2.2s'
   },
   ':nth-of-type(5)': {
      transitionDuration: '1.8s'
   },
   ':nth-of-type(6)': {
      transitionDuration: '1.4s'
   }
}));

export const LastPage = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '20px',
   height: '280px',
   width: '250px',
   backgroundColor: '#e5cf9e',
   position: 'absolute',
   borderRadius: '2px 10px 10px 2px',
   transform: 'rotateX(10deg)',
   transformOrigin: 'center left',
   zIndex: -1
}));

export const BackCover = styled(Box)(() => ({
   height: '300px',
   width: '260px',
   backgroundColor: '#212834',
   borderRadius: '2px 20px 20px 2px',
   position: 'absolute',
   boxShadow: '1px 1px 10px gray',
   transform: 'rotateX(10deg)',
   transformOrigin: 'center left',
   zIndex: '-2'
}));
