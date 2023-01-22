import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
//Components
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Products from './components/Products/ProductsList';
import Layout from './components/Layout/Layout';
import User from './components/pages/User';
import Product from './components/pages/Product';
import Login from './components/pages/Login';
import Buy from './components/pages/Buy';
import Likes from './components/pages/Likes';
import AdminLayout from './components/Admin/AdminLayout/AdminLayout';
import WhatIsNew from './components/Admin/adminWhatIsNew/adminWhatIsNew';
import LessQuantityProd from './components/Admin/adminWhatIsNew/LessQuantityProd/LessQuantityProd';
import NewSales from './components/Admin/adminWhatIsNew/NewSales/NewSales';
import NewUsers from './components/Admin/adminWhatIsNew/NewUsers/NewUsers';
import AdminProducts from './components/Admin/adminProducts/adminProducts';
import AdminUsers from './components/Admin/adminUsers/adminUsers';
import AdminSales from './components/Admin/adminSales/adminSales';
import AdminFAQ from './components/Admin/adminFAQ/adminFAQ';
import SingleUser from './components/Admin/singleUser/SingleUser';

import './styles/toast.css';
import { setUser } from './redux/userSlice';
import { getUser } from './api/api';
import { TUser } from './types';

function App() {
   const isLogged = useAppSelector((state) => state.user.isLogged);
   const id = useAppSelector((state) => state.user.id) as string;
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (isLogged) {
         getUser(id).then((res) => {
            dispatch(setUser(res.snaps.docs[0].data() as TUser));
         });
      }
   }, []);

   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route path='/' element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/shop' element={<Shop />} />
               <Route path='/user' element={<User />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='/shop/:category' element={<Products />} />
               <Route path='/shop/:category/:productId' element={<Product />} />
               <Route path='/buy' element={<Buy />} />
               <Route path='/login' element={<Login />} />
               <Route path='/liked' element={<Likes />} />
               <Route path='/admin' element={<AdminLayout />}>
                  <Route index element={<WhatIsNew />}></Route>
                  <Route path='/admin/less-products' element={<LessQuantityProd />}></Route>
                  <Route path='/admin/new-sales' element={<NewSales />}></Route>
                  <Route path='/admin/new-users' element={<NewUsers />}></Route>
                  <Route path='/admin/products' element={<AdminProducts />}></Route>
                  <Route path='/admin/users' element={<AdminUsers />}></Route>
                  <Route path='/admin/user/:userId' element={<SingleUser />}></Route>
                  <Route path='/admin/sales' element={<AdminSales />}></Route>
                  <Route path='/admin/faq' element={<AdminFAQ />}></Route>
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
