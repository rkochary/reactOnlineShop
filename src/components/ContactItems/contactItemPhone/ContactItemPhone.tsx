import { Box, Button } from '@mui/material';
import { ContactCard, ContactCardContent, ContactCardImage, ContactCardInfo } from './styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function ContactItemPhone() {
   return (
      <ContactCard>
         <ContactCardContent>
            <ContactCardImage>
               <img width='150px' src='https://cdn-icons-png.flaticon.com/512/8265/8265060.png' />
            </ContactCardImage>
            <ContactCardInfo>
               <Box>
                  <Button sx={{ color: 'white' }} startIcon={<FacebookIcon />}>
                     eliteShop
                  </Button>
               </Box>
               <Box>
                  <Button sx={{ color: 'white' }} startIcon={<TwitterIcon />}>
                     eliteShop
                  </Button>
               </Box>
               <Box>
                  <Button sx={{ color: 'white' }} startIcon={<PhoneIcon />}>
                     +374 (00) 11-22-33
                  </Button>
               </Box>
               <Box>
                  <Button sx={{ color: 'white' }} startIcon={<AlternateEmailIcon />}>
                     eliteShop@gmail.com
                  </Button>
               </Box>
            </ContactCardInfo>
         </ContactCardContent>
      </ContactCard>
   );
}
