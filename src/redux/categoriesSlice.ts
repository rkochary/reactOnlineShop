import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategory } from '../types';
import getData from '../api/api';

type TCategoryState = {
   categories: TCategory[];
};

const initialState: TCategoryState = {
   categories: []
};

const getCategories = createAsyncThunk('categories/fetchCategories', async () => {
   const result: TCategory[] = [];

   const data = await getData('categories');
   data.forEach((doc) => {
      const [id, { imgUrl, description, category }] = [doc.id, doc.data()];
      result.push({ id, name: category, imgUrl, description });
   });
   if (!result.length) {
      throw new Error('Something went wrong');
   }
   return result;
});

const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCategories.pending, (state) => {
            state.categories = [];
         })
         .addCase(getCategories.fulfilled, (state, action: PayloadAction<TCategory[]>) => {
            state.categories = action.payload;
         });
   }
});

export { getCategories };
export default categoriesSlice.reducer;
