import { TProduct } from '../types';

export type THookArgs = Omit<TProduct, 'views' | 'count' | 'price' | 'quantity' | 'id'>;

export const useAddValidation = (product: THookArgs) => {
   type ObjectKey = keyof typeof product;
   for (const key in product) {
      const myKey = key as ObjectKey;
      if (!product[myKey]!.trim()) {
         return false;
      }
   }
   return true;
};
