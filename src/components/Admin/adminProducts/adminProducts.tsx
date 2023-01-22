import { useAppSelector } from '../../../store';

import AddProducts from './addProducts/addProducts';
import ProductsSearching from './productsSearching/productsSearching';
import ProductsList from './productsList/productsList';
import ChangeProduct from './changeProduct/changeProduct';

function AdminProducts() {
   const isModalWindow = useAppSelector((state) => state.admin.isModalWindow);

   return (
      <div className='global_products'>
         <h1>Products</h1>
         <hr />
         <ProductsSearching />
         <hr />
         <AddProducts />
         <hr />
         <ProductsList />
         {isModalWindow && <ChangeProduct />}
      </div>
   );
}

export default AdminProducts;
