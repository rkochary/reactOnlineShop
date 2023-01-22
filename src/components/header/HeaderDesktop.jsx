//MUI
import { MenuItem, TextField, Box } from '@mui/material';
//Hooks
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
//Components
import { AppBarContainer, AppBarHeader, MyList } from './styles';
import Actions from './Actions';
import { useTranslation } from 'react-i18next';

const currentLanguage = localStorage.getItem('i18nextLng') || 'en';

const AppBarDesktop = ({ matches }) => {
   const [language, setLanguage] = useState(currentLanguage);
   const navigate = useNavigate();

   const { t, i18n } = useTranslation();

   useEffect(() => {
      i18n.changeLanguage(language);
   }, [language]);

   return (
      <AppBarContainer>
         <AppBarHeader
            sx={{
               color: '#5082FC',
               height: '50px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               fontSize: '38px'
            }}
            onClick={() => {
               navigate('/');
            }}
         >
            Elite Shop
         </AppBarHeader>
         <MyList type='row'>
            <NavLink to={'/'} activeClassName='active'>
               <h4>{t('home')}</h4>
            </NavLink>
            <NavLink to={'/shop'} activeClassName='active'>
               <h4>{t('shop')}</h4>
            </NavLink>
            <NavLink to={'/contact'} activeClassName='active'>
               <h4>{t('contact')}</h4>
            </NavLink>
            <NavLink to={'/about'} activeClassName='active'>
               <h4>{t('about')}</h4>
            </NavLink>
         </MyList>
         <Box width={'90px'} sx={{ outline: 'none' }}>
            <TextField
               size='small'
               sx={{
                  border: '1px solid white',
                  borderRadius: '5px',
                  background: 'white'
               }}
               select
               value={language}
               onChange={(e) => {
                  setLanguage(e.target.value);
               }}
            >
               <MenuItem value='am'>AM</MenuItem>
               <MenuItem value='ru'>RU</MenuItem>
               <MenuItem value='en'>EN</MenuItem>
            </TextField>
         </Box>
         <Actions matches={matches} />
      </AppBarContainer>
   );
};

export default AppBarDesktop;
