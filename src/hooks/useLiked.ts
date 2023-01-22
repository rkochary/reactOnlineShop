import { TLikedType } from '../types';

export const useLiked = (likedProducts: TLikedType[], productId: string): boolean => {
   return likedProducts.some((el) => el.productId === productId);
};
