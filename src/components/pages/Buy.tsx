import { SyntheticEvent, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProduct } from '../../api/api';
import { Button } from '@mui/material';
import { notificationTypes, TProduct } from '../../types';
import { tabPanelProps } from '../../utils/tabPanelProps';
import TabPanel from '../TabPanel/TabPanel';
import { paymentMethodIcons } from '../../utils/payments/payments';
import { useLocation } from 'react-router';
import { buyProduct } from '../../redux/userSlice';
import { useNotify } from '../../hooks/useNotify';
import { collection, doc, increment, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type TLocation = {
   productId: string;
   count: number;
   category: string;
};

export default function Buy() {
   const [value, setValue] = useState<number>(0);
   const { t } = useTranslation();
   const [products, setProducts] = useState<TProduct[]>([]);
   const basket = useAppSelector((state) => state.user.basket);
   const location: TLocation = useLocation().state;
   const notify = useNotify();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!location?.productId) {
         const promises = basket.map(async (el) => {
            const product = await getProduct(el.category, el.productId);
            return { ...product, id: el.productId, count: el.count };
         });
         Promise.all(promises).then((res) => {
            setProducts(res);
         });
      } else {
         getProduct(location?.category, location?.productId).then((res) => {
            setProducts([{ ...res, id: location?.productId, count: location?.count }]);
         });
      }
   }, [basket]);

   const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
      setValue(newValue);
   };

   const handleBuy = () => {
      dispatch(buyProduct(products))
         .unwrap()
         .then(() => {
            const salesRef = collection(db, 'sales');
            products.forEach((el) => {
               setDoc(
                  doc(salesRef, el.id),
                  { id: el.id, count: increment(el.count) },
                  { merge: true }
               );
            });
            const newSalesRef = collection(db, 'newSales');
            products.forEach((el) => {
               setDoc(
                  doc(newSalesRef, el.id),
                  { id: el.id, count: increment(el.count) },
                  { merge: true }
               );
            });

            notify(notificationTypes.SUCCES, 'Succesfully bought');
         })
         .catch((e) => {
            notify(notificationTypes.ERROR, e.message);
         });
   };

   const totalPrice = products.reduce((current, item) => {
      return current + item.price * item.count;
   }, 0);

   return (
      <Box
         sx={{
            width: '100%',
            height: '75vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }}
      >
         <h1 style={{ textAlign: 'center', margin: '50px' }}> {t('methodBuying')}</h1>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
               <Tab label='MasterCard' {...tabPanelProps(0)} />
               <Tab label='Visa Debit Cards' {...tabPanelProps(1)} />
               <Tab label='Idram' {...tabPanelProps(2)} />
               <Tab label='Demo Buy' {...tabPanelProps(3)} />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <img src={paymentMethodIcons.masterCard} alt='mastercard' width='200px' />
            <h1 style={{ margin: '20px' }}>{t('cardError')}</h1>
         </TabPanel>
         <TabPanel value={value} index={1}>
            <img src={paymentMethodIcons.visa} alt='visacard' width='200px' />
            <h1 style={{ margin: '20px' }}>{t('cardError')}</h1>
         </TabPanel>
         <TabPanel value={value} index={2}>
            <img src={paymentMethodIcons.idram} alt='idram' width='200px' />
            <h1 style={{ margin: '20px' }}>{t('cardError')}</h1>
         </TabPanel>
         <TabPanel value={value} index={3}>
            <h2>{t('confirmBuying')}</h2>
            <br />
            <div>
               {products?.map((product) => {
                  return (
                     <h3 key={product.name}>
                        {product.count}x:
                        {product.name}
                     </h3>
                  );
               })}
            </div>
            <br />
            <p>
               {totalPrice}
               {' $ '}
            </p>
            <br />
            <Button variant='outlined' onClick={handleBuy}>
               Buy
            </Button>
         </TabPanel>
      </Box>
   );
}
