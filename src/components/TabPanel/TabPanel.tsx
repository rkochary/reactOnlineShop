import { Box } from '@mui/system';
import { ReactNode } from 'react';

type TTabPanel = {
   value: number;
   index: number;
   children: ReactNode;
};

function TabPanel(props: TTabPanel) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}
               >
                  {children}
               </div>
            </Box>
         )}
      </div>
   );
}

export default TabPanel;
