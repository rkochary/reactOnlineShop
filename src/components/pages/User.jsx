//Hooks
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../store';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
//Actions
import { removeUser } from '../../redux/userSlice';
//Mui
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useTranslation } from 'react-i18next';
//Components
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import Security from '../Security/Security';

export default function User() {
   const [userInfo, setUserInfo] = useState('personalInfo');
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { t } = useTranslation();
   const logged = useAuth();

   const handleUser = (info) => {
      if (info === 'personalInfo') {
         setUserInfo('personalInfo');
      } else {
         setUserInfo('privacy');
      }
   };

   const handleLogOut = () => {
      navigate('/login');
      dispatch(removeUser());
      localStorage.removeItem('currentUser');
   };

   return !logged.isAuth ? (
      <Navigate to={'/login'} />
   ) : (
      <div style={{ background: '#1A202C' }}>
         <div
            className='headerInfo'
            style={{
               textTransform: 'uppercase',
               lineHeight: 0,
               textAlign: 'center',
               marginTop: '6rem',
               color: '#fff'
            }}
         >
            <h1 style={{ fontSize: '6rem', opacity: '0.3' }}>Profile</h1>
            <h6 style={{ fontSize: '1.5rem', fontWeight: 300 }}>User</h6>
         </div>
         <div className='profileContainer'>
            <div className='profileBox'>
               <LogoutIcon
                  onClick={handleLogOut}
                  sx={{
                     position: 'absolute',
                     top: '20px',
                     right: '25px',
                     cursor: 'pointer',
                     color: '#fff'
                  }}
               />
               <SpeedDial
                  ariaLabel='Navigation'
                  sx={{
                     position: 'absolute',
                     bottom: '15px',
                     right: '15px',
                     cursor: 'pointer'
                  }}
                  icon={<SettingsIcon />}
               >
                  <SpeedDialAction
                     icon={<PersonIcon onClick={() => handleUser('personalInfo')} />}
                     tooltipTitle={t('profile')}
                     tooltipOpen
                  />
                  <SpeedDialAction
                     icon={<VerifiedUserIcon onClick={() => handleUser('privacy')} />}
                     tooltipTitle={t('privacy')}
                     tooltipOpen
                  />
               </SpeedDial>
               {userInfo === 'personalInfo' ? <PersonalInfo /> : <Security />}
            </div>
         </div>
      </div>
   );
}
