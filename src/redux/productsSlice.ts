import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TProduct, TProductState } from '../types';

import { getProducts } from '../api/api';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const initialState: TProductState = {
   isLoading: true,
   isError: false,
   products: []
};

const fetchProducts = createAsyncThunk('products/fetchPageProducts', async (category: string) => {
   const result: TProduct[] = [];
   const data = await getProducts(category);

   data.forEach((doc) => {
      const [id, { color, name, count, gender, imgUrl, price, views, brand, quantity }] = [
         doc.id,
         doc.data()
      ];
      result.push({
         color,
         id,
         name,
         count,
         gender,
         imgUrl,
         category,
         price,
         views,
         brand,
         quantity
      });
   });
   if (!result.length) {
      throw new Error('Something went wrong');
   }
   return result;
});

const addViews = createAsyncThunk(
   'products/addViews',
   async ({ productId, category }: { productId: string; category: string }) => {
      const productRef = doc(db, category, productId);
      await updateDoc(productRef, {
         views: increment(1)
      });
      return productId;
   }
);

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<TProduct[]>) => {
            state.isLoading = false;
            state.products = action.payload;
         })
         .addCase(fetchProducts.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.products = [];
            state.isLoading = false;
            state.isError = true;
         })
         .addCase(addViews.fulfilled, (state, action: PayloadAction<string>) => {
            state.products = state.products.map((el) => {
               if (el.id === action.payload) el.views = el.views + 1;
               return el;
            });
         });
   }
});

export { fetchProducts, addViews };
export default productsSlice.reducer;
