import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

import { getAllUsers } from '../../../../api/api';
import { getOldUsersId, setNewUsersIdInDatabase } from '../whatIsNewAPI/whatIsNewAPI';

import { TUser } from '../../../../types';

function NewUsers() {
   const navigate = useNavigate();
   const [newUsers, setNewUsers] = useState<TUser[]>([]);

   useEffect(() => {
      const fetchNewUsers = async () => {
         const filteredNewUsers: TUser[] = [];
         const filteredNewUsersId: string[] = [];
         const allUsers: TUser[] = await getAllUsers();
         const prevUsersId: string[] = await getOldUsersId();
         allUsers.forEach((user: TUser) => {
            if (!prevUsersId.includes(user.id!)) {
               filteredNewUsers.push(user);
               filteredNewUsersId.push(user.id!);
            }
         });
         setNewUsers(filteredNewUsers);
         window.localStorage.setItem('newUsersId', JSON.stringify(filteredNewUsersId));
      };
      fetchNewUsers();
      return () => {
         const passUsersIdToDatabase = async () => {
            const usersId = JSON.parse(window.localStorage.getItem('newUsersId')!) as string[];
            await setNewUsersIdInDatabase(usersId);
         };
         passUsersIdToDatabase();
      };
   }, []);

   const handleUser = (id: string): void => {
      navigate(`/admin/user/${id}`);
   };

   return (
      <div>
         <h3>New Users List</h3>
         <br />
         <br />
         <Button onClick={() => navigate('/admin')} variant='contained' size='small'>
            Go back
         </Button>
         <br />
         <br />
         <table>
            <thead className='users_thead'>
               <tr>
                  <th>N</th>
                  <th>Name</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>ID</th>
               </tr>
            </thead>
            <tbody>
               {newUsers.map((item, index) => {
                  return (
                     <tr key={item.id} className='users_tr' onClick={() => handleUser(item.id!)}>
                        <td>{index + 1}</td>
                        <th>{item.name}</th>
                        <th>{item.lastName}</th>
                        <th>{item.email}</th>
                        <th>{item.id}</th>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}

export default NewUsers;
