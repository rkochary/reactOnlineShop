import { useState, useEffect } from 'react';

import { TProduct } from '../../../types';

import { getData } from '../adminAPI/adminAPI';
import { getSales } from '../../../api/api';

function AdminSales() {
   const [totalIncome, setTotalIncome] = useState<number>(0);
   const [saledProd, setSaledProd] = useState<TProduct[]>([]);

   useEffect(() => {
      const fetchSales = async () => {
         const result: TProduct[] = [];
         let incomeSumup = 0;
         const fetchedProd = await getData();
         const saledData = await getSales();
         fetchedProd.forEach(prod => {
            for (const saled of saledData) {
               if (prod.id === saled.id ) {
                  prod.count = saled.count;
                  incomeSumup += (prod.count * prod.price);
                  result.push(prod);
               }
            }
         });
         setSaledProd(result);
         setTotalIncome(incomeSumup);
      };
      fetchSales();
   }, []);

   return (
      <div>
         <h1>Sales</h1>
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
                  <th>Sales count</th>
                  <th>Income $</th>
               </tr>
            </thead>
            <tbody>
               {saledProd.map((item, index) => {
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
                        <td>{item.quantity}</td>
                        <td>{item.count}</td>
                        <td>{item.count * item.price} $</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <br/><hr/>
         <div>
            <br/>
            <h3>Total income:   {totalIncome} $</h3>
         </div>
      </div>
   );
}

export default AdminSales;
