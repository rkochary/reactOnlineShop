//MUI
import { Box, Tooltip, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialNetwork = () => {
   return (
      <Box sx={{ display: 'flex' }}>
         <Tooltip title='Facebook'>
            <IconButton color='default'>
               <FacebookIcon sx={{ color: '#5082FC' }} />
            </IconButton>
         </Tooltip>
         <Tooltip title='Instagram'>
            <IconButton color='error'>
               <InstagramIcon />
            </IconButton>
         </Tooltip>
         <Tooltip title='Twitter'>
            <IconButton color='default'>
               <TwitterIcon sx={{ color: '#5082FC' }} />
            </IconButton>
         </Tooltip>
      </Box>
   );
};

export default SocialNetwork;
