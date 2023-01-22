import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../store';
//MUI
import Button from '@mui/material/Button';
//Firebase
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
//Actions
import { changeModalWindow, updateProduct, forceRerender } from '../../../../redux/adminSlice';

function ChangeProduct() {
   const products = useAppSelector((state) => state.admin.filteredProducts);
   const currentId = useAppSelector((state) => state.admin.currentProdId);

   const dispatch = useAppDispatch();

   const currentProduct = products.find((item) => item.id === currentId)!;

   const [name, setName] = useState(currentProduct.name);
   const [brand, setBrand] = useState(currentProduct.brand);
   const [image, setImage] = useState(currentProduct.imgUrl);
   const [color, setColor] = useState(currentProduct.color);
   const [gender, setGender] = useState(currentProduct.gender);
   const [price, setPrice] = useState(currentProduct.price);
   const [quantity, setQuantity] = useState(currentProduct.quantity);

   const handleCancelBtn = () => {
      dispatch(changeModalWindow());
   };

   const handleSaveBtn = () => {
      const updatedProduct = {
         name: name,
         brand: brand,
         imgUrl: image,
         color: color,
         gender: gender,
         price: price,
         quantity: quantity,
         category: currentProduct.category,
         count: currentProduct.count || 0,
         views: currentProduct.views,
         id: currentProduct.id
      };
      setDoc(doc(db, `/${currentProduct.category}`, `${currentProduct.id}`), updatedProduct, {
         merge: true
      }).then(() => dispatch(updateProduct(updatedProduct)));
      dispatch(changeModalWindow());
      dispatch(forceRerender(true));
   };

   return (
      <div className='change_modal_window'>
         <div className='change_modal_window_child'>
            <div className='flex_div'>
               <h3>Product</h3>
            </div>
            <div className='input_block'>
               <span>Name</span>
               <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  placeholder='Name*'
               />
            </div>
            <div className='input_block'>
               <span>Brand</span>
               <input type='text' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className='input_block'>
               <span>Image src</span>
               <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className='input_block'>
               <span>Color</span>
               <input type='text' value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className='input_block'>
               <span>Price</span>
               <input type='number' value={price} onChange={(e) => setPrice(+e.target.value)} />
            </div>
            <div className='input_block'>
               <span>Quantity</span>
               <input
                  type='number'
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
               />
            </div>
            <div className='input_block'>
               <span>Gender</span>
               <select value={currentProduct.gender} onChange={(e) => setGender(e.target.value)}>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
               </select>
            </div>
            <div className='input_button_block'>
               <Button onClick={handleSaveBtn} variant='contained' color='success'>
                  Save
               </Button>
               <Button onClick={handleCancelBtn} variant='contained' color='error'>
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   );
}

export default ChangeProduct;
