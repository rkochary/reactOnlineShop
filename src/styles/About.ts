import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { aboutMemberSlider } from '../animation';

export const AboutContainer = styled(Box)(({ theme }) => ({
   height: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   overflow: 'hidden',
   background: '#1A202C',
   marginTop: '-3rem',
   [theme.breakpoints.down('md')]: {
      display: 'none'
   }
}));

export const AboutSlider = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '200px',
   height: '200px',
   transformStyle: 'preserve-3d',
   animation: `${aboutMemberSlider} 30s linear infinite`,
   [theme.breakpoints.down('md')]: {
      width: '150px',
      height: '150px'
   },
   [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px'
   }
}));

export const AboutImagesContainer = styled(Box)(() => ({
   display: 'inline-block',
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   transformOrigin: 'center',
   transformStyle: 'preserve-3d',
   transform: 'rotateY(calc(var(--i)*45deg)) translateZ(350px)'
}));

export const AboutImages = styled('img')(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   borderRadius: '10px',
   objectFit: 'cover',
   transition: '2s',
   '&:hover': {
      transform: ' translateY(-30px) scale(1.2)'
   }
}));

export const TeamMemberContainer = styled(Box)(() => ({
   width: '90%',
   maxWidth: '120rem',
   margin: '8rem auto',
   position: 'relative',
   borderRadius: '8px',
   background: '#DCCDFF',
   marginBottom: '20px'
}));

export const TeamMemberCollector = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-evenly',
   padding: '10px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
   },
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
   }
}));

export const TeamMember = styled(Box)(() => ({
   position: 'relative',
   width: '300px',
   height: '400px',
   background: 'linear-gradient(#2196f3, #2196f3 30%, #1d3548  30%, #1d3548 )',
   borderRadius: '20px',
   overflow: 'hidden',
   '&:hover .TeamMemberInfo': {
      transform: 'translateY(0)'
   },
   '&:hover .TeamMemberImageBox': {
      transform: 'translateY(30px) scale(0.5)'
   },
   marginBottom: '50px'
}));

export const TeamMemberImageBox = styled(Box)(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   transition: '0.5s',
   borderRadius: '20px',
   overflow: 'hidden',
   transformOrigin: 'top'
}));

export const TeamMemberImage = styled('img')(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'cover'
}));

export const TeamMemberInfo = styled(Box)(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'flex-end',
   paddingBottom: '30px',
   transform: 'translateY(100%)',
   transition: '0.5s'
}));

export const TeamMemberDetails = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   textAlign: 'center'
}));

export const AboutMySelf = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   maxWidth: '500px',
   textAlign: 'justify'
}));

export const AboutMySelfHeading = styled(Box)(() => ({
   opacity: 0.3,
   textAlign: 'center',
   textTransform: 'uppercase'
}));
