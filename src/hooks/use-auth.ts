import { useAppSelector } from '../store';

export function useAuth() {
   const { email, isLogged, token, id, name, lastName, status } = useAppSelector(
      (state) => state.user
   );

   return {
      isAuth: !!isLogged,
      email,
      token,
      id,
      name,
      lastName,
      status
   };
}
