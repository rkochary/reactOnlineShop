//Hooks
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNotify } from '../../hooks/useNotify';
import { useAppDispatch, useAppSelector } from '../../store';
//Utils
import { getProduct } from '../../api/api';
//Types
import { notificationTypes, TProduct } from '../../types';
//MUI
import {
   ProductContainer,
   ProductContent,
   ProductImage,
   ProductTitle
} from '../../styles/ProductItem';
import { Typography, Button, Box } from '@mui/material';
//Actions
import { addProduct } from '../../redux/userSlice';
import { addViews } from '../../redux/productsSlice';
import { useTranslation } from 'react-i18next';
type TParams = {
   productId: string;
   category: string;
};

function Product() {
   const { productId, category } = useParams<TParams>() as TParams;
   const [product, setProduct] = useState<TProduct>(undefined!);
   const [quantity, setQuantity] = useState<number>(1);
   const basket = useAppSelector((state) => state.user.basket);
   const userId = useAppSelector((state) => state.user.id);
   const isLogged = useAppSelector((state) => state.user.isLogged);
   const dispatch = useAppDispatch();
   const notify = useNotify();

   const inBasket = basket.find((el) => el.productId === productId)?.count || 0;
   const incrDisabled = quantity >= product?.quantity - inBasket;
   const addBtnDisabled = quantity > product?.quantity - inBasket;
   const decrDisabled = quantity <= 1;
   const { t } = useTranslation();

   useEffect(() => {
      getProduct(category as string, productId as string)
         .then((res) => {
            setProduct(res);
         })
         .then(() => dispatch(addViews({ productId, category })));
   }, []);

   const decreaseQuantity = () => {
      setQuantity(quantity - 1);
   };

   const increaseQuantity = () => {
      setQuantity(quantity + 1);
   };

   const handleAdd = async () => {
      if (isLogged) {
         const newProduct = {
            productId: productId,
            userId: userId,
            category: category,
            count: quantity
         } as { productId: string; userId: string; category: string };
         await dispatch(addProduct({ ...newProduct, count: quantity }))
            .unwrap()
            .then(() => notify(notificationTypes.SUCCES, 'Successfully added'))
            .catch((e) => notify(notificationTypes.ERROR, e.message));
      } else {
         notify(notificationTypes.WARNING, 'You must be logged in!');
      }
   };

   return (
      <ProductContainer
         style={{
            height: '100%',
            background: 'rgba(164, 195, 213, 0.8)'
         }}
      >
         <ProductImage src={product?.imgUrl} />
         <ProductContent>
            <ProductTitle>{product?.name}</ProductTitle>
            <Typography variant='h6'>
               {t('brand')} {' : '}
               <Box sx={{ color: 'rgb(87,153,239)', display: 'inline-block' }}>
                  {product?.brand}
               </Box>
            </Typography>
            <Typography variant='h6'>
               {t('gender')} {' : '}
               <Box sx={{ color: 'rgb(87,153,239)', display: 'inline-block' }}>
                  {product?.gender}
               </Box>{' '}
            </Typography>
            <Typography variant='h6'>
               {t('price')} {' : '}
               <Box sx={{ color: 'rgb(87,153,239)', display: 'inline-block' }}>
                  {product?.price} $
               </Box>
            </Typography>
            <Typography variant='h6'>
               {t('views')} {' : '}
               <Box sx={{ color: 'rgb(87,153,239)', display: 'inline-block' }}>
                  {product?.views}
               </Box>
            </Typography>
            <Typography variant='h6'>
               {t('available')} {' : '}
               <Box sx={{ color: 'rgb(87,153,239)', display: 'inline-block' }}>
                  {product?.quantity}
               </Box>{' '}
            </Typography>
            <Box>
               <Button
                  disabled={decrDisabled}
                  onClick={decreaseQuantity}
                  size='small'
                  variant='text'
                  sx={{
                     background: decrDisabled ? 'grey' : 'rgb(255,99,71)',
                     color: 'white',
                     '&:hover': { background: 'rgba(255,99,71,0.8)' }
                  }}
               >
                  -
               </Button>
               <Typography sx={{ display: 'inline-block', padding: '5px' }}>{quantity}</Typography>
               <Button
                  disabled={incrDisabled}
                  onClick={increaseQuantity}
                  size='small'
                  variant='text'
                  sx={{
                     background: incrDisabled ? 'grey' : 'rgb(103,173,75)',
                     color: 'white',
                     '&:hover': { background: 'rgba(103,173,75,0.8)' }
                  }}
               >
                  +
               </Button>
            </Box>
            <Box sx={{ mt: '10px' }}>
               <Button
                  onClick={handleAdd}
                  disabled={addBtnDisabled}
                  variant='outlined'
                  style={{ marginRight: '10px' }}
               >
                  {t('addToCart')}
               </Button>
               <Button disabled={!product?.quantity} variant='contained'>
                  <Link to={'/buy'} state={{ productId, category, count: quantity }}>
                     {t('buy')}
                  </Link>
               </Button>
            </Box>
         </ProductContent>
      </ProductContainer>
   );
}

export default Product;
