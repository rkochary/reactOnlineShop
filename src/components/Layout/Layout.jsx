//Components
import Header from '../header/Header';
import Footer from '../footer/Footers';
import { Outlet } from 'react-router-dom';
//Toast
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../store';

export default function Layout() {
   const isAdmin = useAppSelector((state) => state.user.status === 'admin');

   return isAdmin ? (
      <Outlet />
   ) : (
      <>
         <ToastContainer newestOnTop={false} />
         <Header />
         <Outlet />
         <Footer />
      </>
   );
}
