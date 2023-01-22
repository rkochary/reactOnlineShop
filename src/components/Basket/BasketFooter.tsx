//MUI
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type TBasketFooter = {
   totalPrice: number;
   hideBasket: (boo: boolean) => void;
};

function BasketFooter({ totalPrice, hideBasket }: TBasketFooter) {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const handleBuyBasketProducts = () => {
      hideBasket(false);
      navigate('/buy');
   };

   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '50px'
         }}
      >
         <h4>
            {t('totalPrice')} {' : '}
            <span style={{ color: '#238636' }}>{totalPrice} $</span>
         </h4>
         <Button variant='contained' onClick={handleBuyBasketProducts}>
            {t('buy')}
         </Button>
      </div>
   );
}

export default BasketFooter;
