import {
   isAsyncThunkAction,
   isFulfilled,
   isAnyOf,
   createListenerMiddleware
} from '@reduxjs/toolkit';
//Actions
import { signIn, signUp, updateUser } from './userSlice';

import { TUser } from '../types';

const signInListenerMiddleware = createListenerMiddleware();

signInListenerMiddleware.startListening({
   matcher: isAnyOf(isAsyncThunkAction(signIn)),
   effect: (action, listenerApi) => {
      const shouldSave = isFulfilled(signIn);
      const state: { user: TUser } = listenerApi.getState() as { user: TUser };
      if (shouldSave(action)) {
         const { id, email, name, status, lastName } = state.user;
         localStorage.setItem(
            'currentUser',
            JSON.stringify({ isLogged: true, id, email, name, status, lastName })
         );
      }
   }
});

const signUpListenerMiddleware = createListenerMiddleware();

signUpListenerMiddleware.startListening({
   matcher: isAnyOf(isAsyncThunkAction(signUp)),
   effect: (action, listenerApi) => {
      const shouldSave = isFulfilled(signUp);
      const state: { user: TUser } = listenerApi.getState() as { user: TUser };
      if (shouldSave(action)) {
         const { id, email, name, status, lastName } = state.user;
         localStorage.setItem(
            'currentUser',
            JSON.stringify({ isLogged: true, id, email, name, status, lastName })
         );
      }
   }
});

const updateUserListenerMiddleware = createListenerMiddleware();

updateUserListenerMiddleware.startListening({
   matcher: isAnyOf(updateUser),
   effect: (action, listenerApi) => {
      const state: { user: TUser } = listenerApi.getState() as { user: TUser };

      const { id, email, name, status, lastName } = state.user;
      localStorage.setItem(
         'currentUser',
         JSON.stringify({ isLogged: true, id, email, name, status, lastName })
      );
   }
});

export const signInMiddleware = signInListenerMiddleware.middleware;
export const signUpMiddleware = signUpListenerMiddleware.middleware;
export const updateUserMiddleware = updateUserListenerMiddleware.middleware;
