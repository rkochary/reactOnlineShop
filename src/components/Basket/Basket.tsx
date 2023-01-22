//Hooks
import { useEffect, useState } from 'react';
import { useNotify } from '../../hooks/useNotify';
//MUI
import { CircularProgress } from '@mui/material';
//Utils
import { getProduct } from '../../api/api';
//Redux
import { removeProduct, removeProducts } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';
//Types
import { notificationTypes, TProduct } from '../../types';
//Components
import BasketFooter from './BasketFooter';
import BasketItem from './BasketItem';
import { useTranslation } from 'react-i18next';

export default function Basket({ hideBasket }: { hideBasket: (boo: boolean) => void }) {
   const basketItems = useAppSelector((state) => state.user.basket);
   const [products, setProducts] = useState<TProduct[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<boolean>(false);
   const notify = useNotify();
   const dispatch = useAppDispatch();
   const userId = useAppSelector((state) => state.user.id)!;
   const { t } = useTranslation();

   useEffect(() => {
      setIsLoading(true);
      const promises = basketItems.map(async (el) => {
         const product = await getProduct(el.category, el.productId);
         return { ...product, id: el.productId, count: el.count };
      });
      const validPromises: TProduct[] = [];
      const invalidPromises: string[] = [];

      Promise.allSettled(promises)
         .then((results) => {
            results.forEach((res) => {
               if (res.status === 'fulfilled') {
                  validPromises.push(res.value);
               } else {
                  invalidPromises.push(`${res.reason}`.split(':')[1].trim());
               }
            });
         })
         .then(() => {
            if (invalidPromises.length)
               dispatch(removeProducts({ productIds: invalidPromises, userId }));
         })
         .then(() => {
            Promise.all(validPromises)
               .then((res) => {
                  setProducts(res);
                  setIsLoading(false);
               })
               .catch((e) => {
                  setError(true);
                  setIsLoading(false);
                  notify(notificationTypes.ERROR, e.message);
               });
         });
   }, [dispatch]);

   const totalPrice = products.reduce((accm, curr) => accm + curr.price * curr.count, 0);

   async function handleRemove(id: string) {
      await dispatch(
         removeProduct({ productId: id, userId: userId } as {
            productId: string;
            userId: string;
         })
      )
         .unwrap()
         .then(() => {
            setProducts(products.filter((el) => el.id !== id));
         })
         .catch((e) => notify(notificationTypes.ERROR, e.message));
   }

   return (
      <>
         {isLoading ? (
            <CircularProgress />
         ) : error ? (
            <span>Something went wrong</span>
         ) : products.length ? (
            products.map((el) => {
               return <BasketItem handleRemove={handleRemove} key={el.id} product={el} />;
            })
         ) : (
            <h3>{t('nothingInBasket')}</h3>
         )}
         {products.length ? <BasketFooter hideBasket={hideBasket} totalPrice={totalPrice} /> : null}
      </>
   );
}
