import { useState, useEffect } from 'react';

import { TUser, TDeletedUser } from '../../../types';

import { getAllUsers, getDeletedUsers, deleteData } from '../../../api/api';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

function AdminUsers() {
   const navigate = useNavigate();
   const [users, setUsers] = useState<TUser[]>([]);
   const [delUsers, setDelUsers] = useState<TDeletedUser[]>([]);

   useEffect(() => {
      const fetchUsers = async () => {
         const fetchedUsers = await getAllUsers();
         const fetchedDelUsers = await getDeletedUsers();
         setUsers(fetchedUsers);
         setDelUsers(fetchedDelUsers);
      };
      fetchUsers();
   }, []);

   const handleUser = (id: string): void => {
      navigate(`/admin/user/${id}`);
   };

   const handleDelBtn = (id: string) => {
      deleteData('deletedUser', id).then(() => {
         setDelUsers((prev) => prev.filter((item) => item.id !== id));
      });
   };

   return (
      <div>
         <h1>Users List</h1>
         <div>
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
                  {users.map((item, index) => {
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
         <br />
         <br />
         <br /> <hr />
         <h1>Deleted Users List</h1>
         <div>
            <table>
               <thead className='users_thead'>
                  <tr>
                     <th>N</th>
                     <th>Name</th>
                     <th>Lastname</th>
                     <th>Email</th>
                     <th>Action</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {delUsers.map((item, index) => {
                     return (
                        <tr key={index} className='users_tr'>
                           <td>{index + 1}</td>
                           <th>{item.name}</th>
                           <th>{item.lastName}</th>
                           <th>{item.email}</th>
                           <th>
                              <Button
                                 onClick={() => handleDelBtn(item.id!)}
                                 variant='contained'
                                 color='error'
                                 size='small'
                              >
                                 Delete
                              </Button>
                           </th>
                           <th>
                              <Button variant='contained' color='success' size='small'>
                                 Restore
                              </Button>
                           </th>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default AdminUsers;
