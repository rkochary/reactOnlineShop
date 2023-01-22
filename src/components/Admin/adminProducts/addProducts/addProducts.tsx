import { useState, useEffect, ChangeEvent } from 'react';
//import {addProduct} from '../../adminAPI/adminAPI'
import { getProducts } from '../../../../redux/adminSlice';
//Firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
//MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { BootstrapInput } from './styles';
import { TProduct } from '../../../../types';
import { THookArgs, useAddValidation } from '../../../../hooks/useAddValidation';
import { useAppDispatch } from '../../../../store';

function AddProducts() {
   const dispatch = useAppDispatch();
   const [imgUrl, setImgUrl] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [brand, setBrand] = useState<string>('');
   const [color, setColor] = useState<string>('');
   const [price, setPrice] = useState<number>(0);
   const [quantity, setQuantity] = useState<number>(0);
   const [gender, setGender] = useState<string>('Gender');
   const [category, setCategory] = useState<string>('Category');
   const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

   useEffect(() => {
      if (
         useAddValidation({
            imgUrl,
            name,
            brand,
            color,
            gender,
            category
         } as THookArgs)
      )
         setBtnDisabled(false);
      else setBtnDisabled(true);
   }, [imgUrl, name, brand, gender, color, price, quantity, category]);

   const addProduct = () => {
      const completedProduct: Omit<TProduct, 'id'> = {
         name,
         brand,
         gender,
         category: category.toLowerCase(),
         color,
         price,
         quantity,
         imgUrl,
         views: 0,
         count: 0
      };
      addDoc(collection(db, `/${category.toLowerCase()}`), completedProduct);
      setName('');
      setBrand('');
      setGender('');
      setCategory('');
      setColor('');
      setPrice(0);
      setQuantity(0);
      setImgUrl('');
      dispatch(getProducts());
   };

   const handleInputNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const number = +e.target.value;
      if (!isNaN(number) && typeof number === 'number') {
         return number;
      } else {
         return 0;
      }
   };

   return (
      <div className='Add_Products_Field'>
         <h3>Add products</h3>
         <div>
            <FormControl sx={{ m: 1 }} variant='standard'>
               <InputLabel htmlFor='demo-customized-select-native'>Category*</InputLabel>
               <NativeSelect
                  id='demo-customized-select-native'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  input={<BootstrapInput />}
               >
                  <option aria-label='None' value='' />
                  <option value='Watches'>Watches</option>
                  <option value='Jewelleries'>Jewelleries</option>
                  <option value='Accessories'>Accessories</option>
               </NativeSelect>
            </FormControl>

            <FormControl sx={{ m: 1 }} variant='standard'>
               <InputLabel htmlFor='demo-customized-select-native'>gender*</InputLabel>
               <NativeSelect
                  id='demo-customized-select-native'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  input={<BootstrapInput />}
               >
                  <option aria-label='None' value='' />
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
               </NativeSelect>
            </FormControl>
            <Box
               component='form'
               sx={{
                  '& > :not(style)': { m: 1, width: '25ch' }
               }}
               noValidate
               autoComplete='off'
            >
               <TextField
                  size='small'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
               />
               <TextField
                  size='small'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  id='outlined-basic'
                  label='Brand'
                  variant='outlined'
               />
               <TextField
                  size='small'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  id='outlined-basic'
                  label='Color'
                  variant='outlined'
               />
               <TextField
                  size='small'
                  value={price}
                  onChange={(e) => setPrice(handleInputNumber(e))}
                  id='outlined-basic'
                  label='Price'
                  variant='outlined'
               />
               <TextField
                  size='small'
                  value={quantity}
                  onChange={(e) => setQuantity(handleInputNumber(e))}
                  id='outlined-basic'
                  label='Quantity'
                  variant='outlined'
               />
               <TextField
                  size='small'
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  id='outlined-basic'
                  label='Image URL'
                  variant='outlined'
               />
            </Box>
         </div>
         <div className='add_button_div'>
            <Button onClick={addProduct} variant='contained' color='success' disabled={btnDisabled}>
               Add
            </Button>
         </div>
      </div>
   );
}

export default AddProducts;
