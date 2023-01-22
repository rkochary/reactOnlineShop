import { useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import {
   getProducts,
   changeModalWindow,
   passCurrentProdId,
   removeProduct
} from '../../../../redux/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';

import Button from '@mui/material/Button';

function ProductsList() {
   const products = useAppSelector((state) => state.admin.filteredProducts);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getProducts());
   }, [dispatch]);

   const handleChangeBtn = (id: string) => {
      dispatch(changeModalWindow());
      dispatch(passCurrentProdId(id));
   };

   const deleteProduct = (id: string, category: string) => {
      deleteDoc(doc(db, `${category}`, `${id}`)).then(() => dispatch(removeProduct(id)));
   };

   const handleQuantityClassName = (quantity: number) => {
      if (quantity > 50) {
         return 'quantity_green';
      } else if (quantity <= 50 && quantity > 10) {
         return 'quantity_blue';
      } else {
         return 'quantity_red';
      }
   };

   return (
      <div className='products_list_field'>
         <h3>Products list</h3>
         <table>
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
                  <th>Action</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {products.map((item, index) => {
                  return (
                     <tr key={index} className='prod_row'>
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
                        <td className={handleQuantityClassName(item.quantity)}>{item.quantity}</td>
                        <td>
                           <Button
                              onClick={() => handleChangeBtn(item.id)}
                              variant='contained'
                              size='small'
                           >
                              change
                           </Button>
                        </td>
                        <td>
                           <Button
                              onClick={() => deleteProduct(item.id, item.category)}
                              variant='contained'
                              color='error'
                              size='small'
                           >
                              delete
                           </Button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
export default ProductsList;
