import {
   EmailAuthProvider,
   getAuth,
   reauthenticateWithCredential,
   updatePassword
} from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { db } from '../../firebase';
import { useNotify } from '../../hooks/useNotify';
import { removeUser } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { notificationTypes } from '../../types';
import { firebaseErrorCatch } from '../../utils/firebaseErrorCatch';

export default function Security() {
   const userEmail = useAppSelector((state) => state.user.email)!;
   const { isError, isLoading, isLogged, token, ...currentUser } = useAppSelector(
      (state) => state.user
   );
   const [oldPassword, setOldPassword] = useState<string>('');
   const [newPassword, setNewPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const notify = useNotify();

   const handleChange = () => {
      if (newPassword !== confirmPassword) {
         notify(notificationTypes.ERROR, 'Passwords are not matching');
         return;
      }
      const user = getAuth().currentUser!;
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);
      reauthenticateWithCredential(user, credential)
         .then(() => {
            updatePassword(user, newPassword).then(
               () => notify(notificationTypes.SUCCES, 'Password changed'),
               (e) => firebaseErrorCatch(e.code)
            );
         })
         .catch((e) => firebaseErrorCatch(e.code));
   };

   const handleDelete = () => {
      if (!oldPassword) {
         notify(notificationTypes.WARNING, 'Enter your password to delete account');
         return;
      }
      const user = getAuth().currentUser!;
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);
      reauthenticateWithCredential(user, credential)
         .then(() => {
            user
               .delete()
               .then(() => {
                  addDoc(collection(db, 'deletedUsers'), currentUser);
                  navigate('/login');
                  dispatch(removeUser());
                  localStorage.removeItem('currentUser');
               })
               .catch((e) => firebaseErrorCatch(e.code));
         })
         .catch((e) => firebaseErrorCatch(e.code));
   };

   const { t } = useTranslation();
   return (
      <div className='profileCard'>
         <h3>{t('changePassword')}</h3>
         <div className='inputBox'>
            <span>{t('oldPassword')}</span>
            <input
               type={'password'}
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               placeholder='...'
            />
         </div>
         <div className='inputBox'>
            <span>{t('newPassword')}</span>
            <input
               type={'password'}
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               placeholder='...'
            />
         </div>
         <div className='inputBox'>
            <span>{t('confirmPassword')}</span>
            <input
               type={'password'}
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder='...'
            />
         </div>
         <div>
            <button className='personalInfoChangeButton' onClick={handleChange}>
               {t('changePassword')}
            </button>
            <button className='deleteAccountButton' onClick={handleDelete}>
               {t('deleteAccount')}
            </button>
         </div>
      </div>
   );
}
