import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getLessProdId, getOldUsersId, getOldSalesId } from './whatIsNewAPI/whatIsNewAPI';
import { getData } from '../adminAPI/adminAPI';
import { getAllUsers } from '../../../api/api';

import sales from '../../../assets/trolley.png';
import bell from '../../../assets/notification.png';
import user from '../../../assets/user.png';
import prodLogo from '../../../assets/brand-identity.png';
import salesLogo from '../../../assets/growth.png';
import userLogo from '../../../assets/new.png';

import { TUser } from '../../../types';

function WhatIsNew() {
   const navigate = useNavigate();
   const [lessLength, setLessLength] = useState<number>(0);
   const [usersCount, setUsersCount] = useState<number>(0);
   const [salesCount, setSalesCount] = useState<number>(0);

   useEffect(() => {
      const fetchNotifications = async () => {
         /////////less products/////
         const newLess: string[] = [];
         const currentOldLess: string[] = [];
         const fetchProducts = await getData();
         const fetchOldProdId = await getLessProdId();

         for (const item of fetchProducts) {
            if (item.quantity <= 10) {
               if (fetchOldProdId.includes(item.id)) {
                  currentOldLess.push(item.id);
               } else {
                  newLess.push(item.id);
               }
            }
         }
         setLessLength(newLess.length);

         /////// new users//////////
         let userCount = 0;
         const prevUsersId: string[] = await getOldUsersId();
         const allUsers: TUser[] = await getAllUsers();
         allUsers.forEach((user) => {
            if (!prevUsersId.includes(user.id!)) {
               userCount++;
            }
         });
         setUsersCount(userCount);

         ///////////new sales/////////
         const prevSaleId = await getOldSalesId();
         setSalesCount(prevSaleId.length);
      };

      fetchNotifications();
   }, []);

   return (
      <div className=''>
         <h1>what is new</h1>
         <div className='what_is_New_borad'>
            <div>
               <h3>LESS PRODUCTS</h3>
               <div className='logo_frame' onClick={() => navigate('/admin/less-products')}>
                  <div className='lessProd_notify'>
                     {lessLength ? (
                        <>
                           <img src={bell} />
                           <div className='lessProd_notify_num'>{lessLength}</div>
                        </>
                     ) : null}
                  </div>
                  <img src={prodLogo} />
               </div>
            </div>

            <div>
               <h3>NEW SALES</h3>
               <div className='logo_frame' onClick={() => navigate('/admin/new-sales')}>
                  <div className='lessSales_notify'>
                     {salesCount ? (
                        <>
                           <img src={bell} />
                           <div className='lessProd_notify_num'>{salesCount}</div>
                        </>
                     ) : null}
                  </div>
                  <img src={salesLogo} />
               </div>
            </div>

            <div>
               <h3>NEW USERS</h3>
               <div className='logo_frame' onClick={() => navigate('/admin/new-users')}>
                  <div className='newUsers_notify'>
                     {usersCount ? (
                        <>
                           <img src={bell} />
                           <div className='newUsers_notify_num'>{usersCount}</div>
                        </>
                     ) : null}
                  </div>
                  <img src={userLogo} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default WhatIsNew;
