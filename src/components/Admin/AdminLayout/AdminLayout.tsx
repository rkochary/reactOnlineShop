import { useNavigate, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';

//styles
import './style.css';
import '../adminProducts/style.css';
import '../adminProducts/productsList/style.css';
import '../adminProducts/productsSearching/style.css';
import '../adminProducts/addProducts/style.css';
import '../adminProducts/changeProduct/style.css';
import '../adminWhatIsNew/style.css';
import '../adminWhatIsNew/LessQuantityProd/style.css';
import '../adminUsers/style.css';
import '../adminFAQ/style.css';

import { useAppDispatch, useAppSelector } from '../../../store';
import { AccStatus } from '../../../types';
import { removeUser } from '../../../redux/userSlice';

import Logout from '@mui/icons-material/Logout';

function AdminLayout() {
   const dispatch = useAppDispatch();
   const status = useAppSelector((state) => state.user.status);
   const navigate = useNavigate();

   const handleLogout = () => {
      navigate('/login');
      dispatch(removeUser());
      localStorage.removeItem('currentUser');
   };

   return status !== AccStatus.ADMIN ? (
      <Navigate to={'/shop'} />
   ) : (
      <>
         <div>
            <div className='nav_bar'>
               <ul className='nav_bar_ul'>
                  <li onClick={() => navigate('/admin')}>What is new</li>
                  <li onClick={() => navigate('/admin/products')}>Products</li>
                  <li onClick={() => navigate('/admin/users')}>Users</li>
                  <li onClick={() => navigate('/admin/sales')}>Sales</li>
                  <li onClick={() => navigate('/admin/faq')}>FAQ</li>
               </ul>
               <button className='nav_bar_logout' onClick={handleLogout}>
                  <Logout />
               </button>
            </div>
         </div>
         <div className='admin_body'>
            <Outlet />
         </div>
      </>
   );
}
export default AdminLayout;
