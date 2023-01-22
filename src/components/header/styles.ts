//MUI
import { styled } from '@mui/material/styles';
import { Typography, List, Box } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Colors } from '../../styles/Theme';
//Fonts
import '@fontsource/montez';

export const AppBarContainer = styled(Box)(() => ({
   background: '#212834',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '2px 8px'
}));

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
   '& .MuiBadge-badge': {
      right: -4,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '2 5px'
   }
}));

export const AppBarHeader = styled(Typography)(() => ({
   padding: '4px',
   flexGrow: 1,
   fontSize: '4em',
   fontFamily: '"Montez", "Cursive"',
   color: 'white',
   cursor: 'pointer'
}));

export const MyList = styled(List)(({ type }: { type: string }) => ({
   color: 'white',
   display: type === 'row' ? 'flex' : 'block',
   flexGrow: 3,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
   flexGrow: 0
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
   display: 'flex',
   background: Colors.secondary,
   position: 'fixed',
   bottom: 0,
   left: 0,
   width: '100%',
   alignItems: 'center',
   zIndex: 99,
   borderTop: '1px solid white'
}));
