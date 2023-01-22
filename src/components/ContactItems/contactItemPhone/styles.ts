import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ContactCard = styled(Box)(() => ({
   width: '600px',
   margin: '20px auto',
   height: '300px',
   overflow: 'hidden',
   backgroundColor: 'rgb(33,40,52)',
   position: 'relative',
   borderRadius: '24px'
}));

export const ContactCardContent = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   display: 'grid',
   gridTemplateColumns: '1fr 1fr',
   position: 'absolute',
   gridGap: '24px',
   top: 0,
   left: 0
}));

export const ContactCardImage = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   border: '3px solid white',
   overflow: 'hidden',
   borderBottomRightRadius: '50%',
   borderTopColor: 'transparent',
   borderLeftColor: 'transparent',
   color: 'white'
}));

export const ContactCardInfo = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   overflow: 'hidden'
}));
