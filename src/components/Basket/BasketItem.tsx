//MUI
import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TProduct } from '../../types';
import { useTranslation } from 'react-i18next';

type TBasketItemProps = {
   product: TProduct;
   handleRemove: (id: string) => void;
};

export default function BasketItem(props: TBasketItemProps) {
   const { product, handleRemove } = props;
   const { t } = useTranslation();

   return (
      <div
         style={{
            display: 'flex',
            width: '100%',
            height: '120px',
            overflow: 'hidden',
            marginBottom: '10px',
            background: '#fff',
            transition: 'all .6s ease',
            boxShadow: ' #212834 0 7px 18px 0',
            position: 'relative',
            borderRadius: '8px',
            padding: '5px',
            border: '2px solid #212834'
         }}
      >
         <Box>
            <img
               width='190px'
               height='120px'
               style={{ objectFit: 'cover' }}
               src={product.imgUrl}
               alt='itemImage'
            />
         </Box>
         <Box sx={{ padding: '20px', position: 'relative', width: '100%' }}>
            <h3 style={{ marginBottom: '5px', color: '#383535' }}>{product.name}</h3>
            <h4 style={{ marginBottom: '10px', color: '#383535' }}>
               {t('price')} {' : '}
               <span style={{ color: '#238636' }}>{product.price} $</span>
            </h4>
            <h4 style={{ color: '#383535' }} className='unit'>
               {t('quantity')} {' : '}
               <span style={{ color: '#238636' }}>{product.count}</span>
            </h4>
         </Box>
         <Tooltip onClick={() => handleRemove(product.id)} title='Delete'>
            <IconButton sx={{ position: 'absolute', bottom: '8px', right: '10px' }}>
               <DeleteIcon sx={{ color: '#F14B46' }} />
            </IconButton>
         </Tooltip>
      </div>
   );
}
