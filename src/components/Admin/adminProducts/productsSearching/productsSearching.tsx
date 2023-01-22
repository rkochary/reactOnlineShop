import { useState } from 'react';
import Button from '@mui/material/Button';

import { useAppDispatch } from '../../../../store';
import { searchByFilter, getFilteredProducts } from '../../../../redux/adminSlice';

enum DropdownFeatures {
   NONE = 'Search by',
   NAME = 'Name',
   BRAND = 'Brand',
   COLOR = 'Color',
   GENDER = 'Gender'
}

enum DropdownCategories {
   ALL = 'All',
   WATCHES = 'Watches',
   JEWELLERIES = 'Jewelleries',
   ACCESSORIES = 'Accessories'
}

function ProductsSearching() {
   const dispatch = useAppDispatch();

   const [feature, setFeature] = useState<string>('');
   const [category, setCategory] = useState<string>('');
   const [searchText, setSearchText] = useState<string>('');

   const handleSearchBtn = () => {
      let selectedCategory;
      let selectedFeature;
      const text = searchText.trim().toLowerCase();
      if (feature === DropdownFeatures.NONE) {
         selectedFeature = '';
      } else {
         selectedFeature = feature.toLowerCase();
      }

      if (category === DropdownFeatures.NONE) {
         selectedCategory = '';
      } else {
         selectedCategory = category.toLowerCase();
      }
      dispatch(searchByFilter({ selectedCategory, selectedFeature, text })); // info pass
      dispatch(getFilteredProducts()); // fetch by passed above info
   };


   return (
      <div className='product_search_block'>
         <select defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.keys(DropdownCategories).map((item) => {
               type CategoriesIndex = keyof typeof DropdownCategories;
               const myKey = item as CategoriesIndex;
               return (
                  <option key={item} value={`${item}`}>
                     {DropdownCategories[myKey]}
                  </option>
               );
            })}
         </select>
         <select value={feature} onChange={(e) => setFeature(e.target.value)}>
            {Object.keys(DropdownFeatures).map((item) => {
               type FeatureIndex = keyof typeof DropdownFeatures;
               const myKey = item as FeatureIndex;
               return (
                  <option key={item} value={`${DropdownFeatures[myKey]}`}>
                     {DropdownFeatures[myKey]}
                  </option>
               );
            })}
         </select>

         <input type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
         <Button onClick={handleSearchBtn} variant='contained' size='small'>
            search
         </Button>
      </div>
   );
}

export default ProductsSearching;
