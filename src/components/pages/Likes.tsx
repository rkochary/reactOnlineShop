//Hooks
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNotify } from '../../hooks/useNotify';
//MUI
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Box } from '@mui/material';
//Utils
import { getProduct } from '../../api/api';
//Types
import { notificationTypes, TProduct } from '../../types';
//Components
import ProductItem from '../Products/ProductItem';
import { removeProducts } from '../../redux/userSlice';
import { useTranslation } from 'react-i18next';

export default function Likes() {
   const likedProducts = useAppSelector((state) => state.user.likedProducts);
   const userId = useAppSelector((state) => state.user.id)!;
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [products, setProducts] = useState<TProduct[]>([]);
   const [error, setError] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const notify = useNotify();
   const { t } = useTranslation();

   useEffect(() => {
      setIsLoading(true);
      const promises = likedProducts.map(async (el) => {
         const product = await getProduct(el.category, el.productId);
         return { ...product, id: el.productId, category: el.category };
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

   return (
      <Box sx={{ minHeight: '100vh', background: '#f2f2f2' }}>
         <Container sx={{ minHeight: '100vh', background: '#f2f2f2' }}>
            <Box
               sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '30px',
                  justifyContent: 'center',
                  alignItems: 'center'
               }}
            >
               {isLoading ? (
                  <CircularProgress />
               ) : error ? (
                  <span>Something went wrong</span>
               ) : products.length ? (
                  products.map((el) => {
                     return <ProductItem key={el.id} product={el} />;
                  })
               ) : (
                  <h2 style={{ width: '100%', textAlign: 'center' }}>{t('nothingInLiked')}</h2>
               )}
            </Box>
         </Container>
      </Box>
   );
}
