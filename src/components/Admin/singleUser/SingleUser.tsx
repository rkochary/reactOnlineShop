import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { getAllUsers } from '../../../api/api';
import { getData } from '../adminAPI/adminAPI';

import { TUser, TProduct } from '../../../types';

function SingleUser() {
   const [user, setUser] = useState<TUser>();
   const [likedProd, setLikedProd] = useState<TProduct[]>([]);
   const [basket, setBasket] = useState<TProduct[]>([]);
   const { userId } = useParams();

   useEffect(() => {
      const fetchUserActions = async () => {
         const userBasket: TProduct[] = [];
         const userLikes: TProduct[] = [];

         const users = await getAllUsers();
         const fetchedProds = await getData();
         const fetchedUser = users.find((item) => item.id === userId)!;

         fetchedProds.forEach((prod) => {
            for (const item of fetchedUser.likedProducts) {
               if (prod.id === item.productId) {
                  userLikes.push(prod);
               }
            }
            for (const item of fetchedUser.basket) {
               if (prod.id === item.productId) {
                  userBasket.push({ ...prod, count: item.count || 0 });
               }
            }
         });

         setLikedProd(userLikes);
         setBasket(userBasket);
         setUser(fetchedUser);
      };
      fetchUserActions();
   }, []);

   return (
      <div>
         <div>
            <h2 className='user_name'>
               {user?.name} {user?.lastName}
            </h2>
         </div>
         <div className='info_frame'>
            <div>
               <span className='info_span'>Email: </span> <span>{user?.email}</span>
            </div>
            <div>
               <span className='info_span'>User ID: </span> <span>{user?.id}</span>
            </div>
            <hr />
            <br />
            <h2>Liked products</h2>
            {likedProd.length ? (
               <table className='table'>
                  <thead>
                     <tr>
                        <th>N</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Gender</th>
                        <th>Color</th>
                        <th>Price $</th>
                        <th>Views</th>
                        <th>Quantity</th>
                     </tr>
                  </thead>
                  <tbody>
                     {likedProd.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                 <img className='products_list_image' src={item.imgUrl} />
                              </td>
                              <td>{item.category}</td>
                              <td>{item.name}</td>
                              <td>{item.brand}</td>
                              <td>{item.gender}</td>
                              <td>{item.color}</td>
                              <td>{item.price}$</td>
                              <td>{item.views}</td>
                              <td>{item.quantity}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            ) : (
               <span>empty</span>
            )}
            <hr />
            <br />
            <h2>Basket</h2>
            {basket.length ? (
               <table className='table'>
                  <thead>
                     <tr>
                        <th>N</th>
                        <th>Image</th>
                        <th>Count</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Gender</th>
                        <th>Color</th>
                        <th>Price $</th>
                        <th>Views</th>
                        <th>Quantity</th>
                     </tr>
                  </thead>
                  <tbody>
                     {basket.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                 <img className='products_list_image' src={item.imgUrl} />
                              </td>
                              <td>{item.count}</td>
                              <td>{item.category}</td>
                              <td>{item.name}</td>
                              <td>{item.brand}</td>
                              <td>{item.gender}</td>
                              <td>{item.color}</td>
                              <td>{item.price}$</td>
                              <td>{item.views}</td>
                              <td>{item.quantity}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            ) : (
               <span>empty</span>
            )}
         </div>
      </div>
   );
}

export default SingleUser;
