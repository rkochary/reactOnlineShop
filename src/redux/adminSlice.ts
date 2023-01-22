import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../types';
import { getData } from '../components/Admin/adminAPI/adminAPI';
import { TFaqItem } from '../components/About/accordion/Accordion';

type TInitialState = {
   allProducts: TProduct[];
   filteredProducts: TProduct[];
   currentProdId: string;
   searchByCategory: string;
   searchByFeature: string;
   searchText: string;
   isModalWindow: boolean;
   rerender: boolean;
   newUsersCount: number;
   singleUserId: string;
   newUsersVisibility: boolean;
   faqModal: boolean;
   currentFAQ: TFaqItem;
};

type TSearchFilter = {
   selectedCategory: string;
   selectedFeature: string;
   text: string;
};

const initialState: TInitialState = {
   allProducts: [],
   filteredProducts: [],
   currentProdId: '',
   searchByCategory: '',
   searchByFeature: '',
   searchText: '',
   isModalWindow: false,
   rerender: false,
   newUsersCount: 0,
   singleUserId: '',
   newUsersVisibility: false,
   faqModal: false,
   currentFAQ: { answer: '', question: '', id: '' }
};

export const getProducts = createAsyncThunk('products/fetchProducts', async () => {
   const result = await getData();
   return result;
});

export const getFilteredProducts = createAsyncThunk('products/fetchFilteredProducts', async () => {
   const result = await getData();
   return result;
});

const adminSlice = createSlice({
   name: 'admin',
   initialState,
   reducers: {
      searchByFilter: (state, action: PayloadAction<TSearchFilter>) => {
         const { selectedCategory, selectedFeature, text } = action.payload;
         state.searchByCategory = selectedCategory;
         state.searchByFeature = selectedFeature;
         state.searchText = text;
      },
      changeModalWindow: (state) => {
         state.isModalWindow = !state.isModalWindow;
      },
      passCurrentProdId: (state, action: PayloadAction<string>) => {
         state.currentProdId = action.payload;
      },
      updateProduct: (state, action: PayloadAction<TProduct>) => {
         state.filteredProducts = state.filteredProducts.map((el) => {
            if (el.id === action.payload.id) {
               return action.payload;
            }
            return el;
         });
      },
      removeProduct: (state, action: PayloadAction<string>) => {
         state.filteredProducts = state.filteredProducts.filter((el) => el.id !== action.payload);
      },
      forceRerender: (state, action: PayloadAction<boolean>) => {
         state.rerender = action.payload;
      },
      changeNewUsersCount: (state, action: PayloadAction<number>) => {
         state.newUsersCount = action.payload;
      },
      passSingleUserId: (state, action: PayloadAction<string>) => {
         state.singleUserId = action.payload;
      },
      changeNewUsersVisibility: (state, action) => {
         state.newUsersVisibility = action.payload;
      },
      changeFaqModal: (state) => {
         state.faqModal = !state.faqModal;
      },
      passCurrentFAQ: (state, action) => {
         state.currentFAQ = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getProducts.fulfilled, (state, action: PayloadAction<TProduct[]>) => {
            state.allProducts = action.payload;
            state.filteredProducts = action.payload;
         })
         .addCase(getFilteredProducts.fulfilled, (state, action: PayloadAction<TProduct[]>) => {
            let result = action.payload;
            if (state.searchByCategory !== '') {
               result = result.filter((item) => item.category === state.searchByCategory);
            }
            if (state.searchByFeature !== '') {
               result = result.filter((item) => {
                  const { views, price, count, quantity, ...myProd } = item;
                  type Index = keyof typeof myProd;
                  const myKey = state.searchByFeature as Index;
                  return myProd[myKey]!.toLowerCase().includes(state.searchText);
               });
            }
            if (state.searchText.trim() !== '' && state.searchByFeature === '') {
               result = result.filter(
                  (item) =>
                     item.name.toLowerCase().includes(state.searchText) ||
                     item.brand.toLowerCase().includes(state.searchText)
               );
            }
            state.filteredProducts = result;
         });
   }
});

export const {
   forceRerender,
   searchByFilter,
   changeModalWindow,
   passCurrentProdId,
   updateProduct,
   removeProduct,
   changeNewUsersCount,
   changeFaqModal,
   passCurrentFAQ
} = adminSlice.actions;
export default adminSlice.reducer;
