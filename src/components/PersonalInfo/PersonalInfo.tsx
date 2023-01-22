import { updateDoc } from '@firebase/firestore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUser } from '../../api/api';
import { updateUser } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { firebaseErrorCatch } from '../../utils/firebaseErrorCatch';

export default function PersonalInfo() {
   const userName = useAppSelector((state) => state.user.name)!;
   const userLastName = useAppSelector((state) => state.user.lastName)!;
   const userId = useAppSelector((state) => state.user.id)!;
   const [name, setName] = useState<string>(userName);
   const [lastName, setLastName] = useState<string>(userLastName);
   const [onEdit, setOnEdit] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const { t } = useTranslation();

   const handleSave = async () => {
      const user = await getUser(userId);
      updateDoc(user.userRef, { name, lastName })
         .catch((e) => firebaseErrorCatch(e.message))
         .then(() => {
            dispatch(updateUser({ name, lastName }));
            setOnEdit(false);
         });
   };

   const handleCancel = () => {
      setName(userName);
      setLastName(userLastName);
      setOnEdit(false);
   };

   const handleChange = () => {
      setOnEdit(true);
   };

   return (
      <div className='profileCard'>
         <h3>{t('Personal info')}</h3>
         <div className='inputBox'>
            <span>{t('firstName')}</span>
            <input
               type={'text'}
               name='username'
               onChange={(e) => setName(e.target.value)}
               readOnly={!onEdit}
               value={name}
            />
         </div>
         <div className='inputBox'>
            <span>{t('lastName')}</span>
            <input
               value={lastName}
               type={'text'}
               name='userLastName'
               onChange={(e) => setLastName(e.target.value)}
               readOnly={!onEdit}
            />
         </div>
         {onEdit ? (
            <div className='personalInfoHandleButton'>
               <button style={{ color: 'limegreen' }} onClick={handleSave}>
                  {t('Save')}
               </button>
               <button style={{ color: 'red' }} onClick={handleCancel}>
                  {t('Cancel')}
               </button>
            </div>
         ) : (
            <div>
               <button className='personalInfoChangeButton' onClick={handleChange}>
                  {t('Change')}
               </button>
            </div>
         )}
      </div>
   );
}
