import { useNotify } from '../hooks/useNotify';
import { FirebaseErrors, notificationTypes } from '../types';

const notify = useNotify();

export function firebaseErrorCatch(error: string): void {
   console.log(error);
   type index = keyof typeof FirebaseErrors;
   const myKey = error as index;
   notify(notificationTypes.ERROR, FirebaseErrors[myKey]);
}
