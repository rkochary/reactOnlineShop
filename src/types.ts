export type TProduct = {
   id: string;
   price: number;
   name: string;
   gender: string;
   category: string;
   imgUrl: string;
   count: number;
   views: number;
   brand: string;
   quantity: number;
   color: string;
};

export type TProductState = {
   isLoading: boolean;
   isError: boolean;
   products: TProduct[];
};

export type TSales = {
   count: number ;
   id: string ;
}

export type TCategory = {
   id: string;
   name: string;
   imgUrl: string;
   description: string;
};

export type TLikedType = {
   category: string;
   productId: string;
};

export type TBasketType = {
   productId: string;
   category: string;
   count: number;
};

export enum AccStatus {
   ADMIN = 'admin',
   USER = 'user',
   GUEST = 'guest'
}

export const FirebaseErrors = {
   'auth/user-not-found': 'User not found',
   'auth/email-already-exists': 'Email already exists',
   'auth/invalid-email': 'Invalid email',
   'auth/invalid-password': 'Invalid password',
   'auth/email-already-in-use': 'Email already in use',
   'auth/different-passwords': 'Passwords are not matching',
   'auth/weak-password': 'Password should be at least 6 characters',
   'auth/wrong-password': 'Wrong password',
   'auth/too-many-requests': 'Too many request, try later'
};

export type TUser = {
   id: string | null;
   email: string | null;
   token: string | null;
   name: string | null;
   lastName: string | null;
   basket: TBasketType[];
   likedProducts: TLikedType[];
   status: AccStatus;
};

export type TDeletedUser = {
   id: string;
   email: string | null;
   name: string | null;
   lastName: string | null;
   basket: TBasketType[];
   likedProducts: TLikedType[];
   status: AccStatus;
};

export enum notificationTypes {
   WARNING = 'warning',
   ERROR = 'error',
   SUCCES = 'success'
}

export interface SerializedError {
   name?: string;
   message?: string;
   stack?: string;
   code?: string;
}
