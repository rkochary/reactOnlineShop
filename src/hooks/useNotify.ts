import { toast } from 'react-toastify';
import { notificationTypes } from '../types';

export const useNotify = () => {
   return function (type: notificationTypes, message: string) {
      const config = {
         autoClose: 500,
         closeOnClick: true,
         pauseOnHover: true,
         className: 'toast-message',
         pauseOnFocusLoss: false,
         hideProgressBar: true
      };
      switch (type) {
         case notificationTypes.WARNING:
            toast.warning(message, config);
            break;
         case notificationTypes.SUCCES:
            toast.success(message, config);
            break;
         case notificationTypes.ERROR:
            toast.error(message, config);
            break;
         default:
            return false;
      }
   };
};
