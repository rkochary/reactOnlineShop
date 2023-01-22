import { createTheme } from '@mui/material/styles';

export const Colors = {
   primary: '#90caf9',
   secondary: 'rgb(40, 34, 66)',
   info: 'rgba(117,117,117,0.8)'
};

const theme = createTheme({
   palette: {
      primary: {
         main: Colors.primary
      },
      secondary: {
         main: Colors.secondary
      }
   }
});

export default theme;
