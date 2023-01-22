import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';

import {  TProduct } from '../../../../types';

import { getData } from '../../adminAPI/adminAPI';
import { getOldSalesId } from '../whatIsNewAPI/whatIsNewAPI';

function NewSales() {
   const navigate = useNavigate();
   const [totalIncome, setTotalIncome] = useState<number>(0);
   const [saledProd, setSaledProd] = useState<TProduct[]>([]);

   useEffect(() => {
      const fetchNewSales = async () => {
         const result: TProduct[] = [];
         let incomeSumup = 0;
         const fetchedProd = await getData();
         const saledData = await getOldSalesId();
         fetchedProd.forEach((prod) => {
            for (const saled of saledData) {
               if (prod.id === saled.id) {
                  prod.count = saled.count;
                  incomeSumup += prod.count * prod.price;
                  result.push(prod);
               }
            }
         });
         setSaledProd(result);
         setTotalIncome(incomeSumup);
      };
      fetchNewSales();

      // return () => {
      //    cleanNewSalesData();
      // };
   }, []);

   return (
      <div>
         <h3>New sales List</h3>
         <br />
         <br />
         <Button onClick={() => navigate('/admin')} variant='contained' size='small'>
            Go back
         </Button>
         <br />
         <br />
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
         <br />
         <hr />
         <div>
            <br />
            <h3>Total income: {totalIncome} $</h3>
         </div>
      </div>
   );
}

export default NewSales;
