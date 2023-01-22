import { Button, Typography } from '@mui/material';
import {
   BackCover,
   Book,
   BookCover,
   ContactContainer,
   AlternativeMenu,
   LastPage,
   Page
} from '../../styles/Contact';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import ContactItemMail from '../../components//ContactItems/contactItemMail/ContactItemMail';
import ContactItemPhone from '../ContactItems/contactItemPhone/ContactItemPhone';
import ContactItemMap from '../ContactItems/contactItemMap/ContactItemMap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from 'react-loader-spinner';

export default function Contact() {
   const [showItem, setShowItem] = useState('');
   const { t } = useTranslation();

   let Component;

   if (showItem === 'ContactItemMap') {
      Component = <ContactItemMap />;
   } else if (showItem === 'ContactItemPhone') {
      Component = <ContactItemPhone />;
   } else {
      Component = <ContactItemMail />;
   }

   return (
      <ContactContainer sx={{ background: '#1A202C' }}>
         <Book>
            <BookCover className='bookCover'>
               <Typography
                  variant='h4'
                  sx={{ color: '#5082fc', fontFamily: '"Montez", "Cursive"', marginTop: '30px' }}
               >
                  {t('guide')}
                  <div style={{ position: 'absolute', bottom: '60px', left: '75px' }}>
                     <Comment
                        height='100'
                        width='100'
                        ariaLabel='comment-loading'
                        color='#fff'
                        backgroundColor='#5082FC'
                     />
                  </div>
               </Typography>
            </BookCover>
            <Page className='page' />
            <Page className='page' />
            <Page className='page' />
            <Page className='page' />
            <Page className='page' />
            <LastPage>
               <Button
                  onClick={() => setShowItem('')}
                  size='small'
                  sx={{ color: '#212834' }}
                  endIcon={<EmailIcon />}
               >
                  {t('email')}
               </Button>
               <Button
                  onClick={() => setShowItem('ContactItemPhone')}
                  size='small'
                  sx={{ color: '#212834' }}
                  endIcon={<PhoneIcon />}
               >
                  {t('phone')}
               </Button>
               <Button
                  onClick={() => setShowItem('ContactItemMap')}
                  size='small'
                  sx={{ color: '#212834' }}
                  endIcon={<MapIcon />}
               >
                  {t('map')}
               </Button>
            </LastPage>
            <BackCover></BackCover>
         </Book>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'space-evenly',
               margin: '0px 40px'
            }}
         >
            <AlternativeMenu>
               <div>
                  <Button
                     onClick={() => setShowItem('')}
                     size='small'
                     style={{
                        color: 'white',
                        border: '1px solid white',
                        padding: '10px',
                        margin: '5px'
                     }}
                     endIcon={<EmailIcon />}
                  >
                     {t('email')}
                  </Button>
                  <Button
                     onClick={() => setShowItem('ContactItemPhone')}
                     size='small'
                     style={{
                        color: 'white',
                        border: '1px solid white',
                        padding: '10px',
                        margin: '5px'
                     }}
                     endIcon={<PhoneIcon />}
                  >
                     {t('phone')}
                  </Button>
                  <Button
                     onClick={() => setShowItem('ContactItemMap')}
                     size='small'
                     style={{
                        color: 'white',
                        border: '1px solid white',
                        padding: '10px',
                        margin: '5px'
                     }}
                     endIcon={<MapIcon />}
                  >
                     {t('map')}
                  </Button>
               </div>
            </AlternativeMenu>
            {Component}
         </div>
      </ContactContainer>
   );
}
