//Hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
//Components
import ProductItem from './ProductItem';
//Actions
import { fetchProducts } from '../../redux/productsSlice';
//MUI
import {
   Container,
   Grid,
   Typography,
   Box,
   InputLabel,
   FormControl,
   Select,
   MenuItem,
   SelectChangeEvent,
   TextField,
   Button,
   Switch,
   FormControlLabel
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
//Types
import { TProduct } from '../../types';
import MyPagination from '../Pagination/Pagination';
import { useTranslation } from 'react-i18next';

export default function ProductsList() {
   const { category } = useParams();
   const [itemCount, setItemCount] = useState<number>(6);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [pages, setPages] = useState<number>(1);
   const [pageProducts, setPageProducts] = useState<TProduct[]>([]);
   const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
   const [gender, setGender] = useState('all');
   const [brand, setBrand] = useState('all');
   const [minPrice, setMinPrice] = useState('0');
   const [maxPrice, setMaxPrice] = useState('10000000');
   const [filterName, setFilterName] = useState('');
   const [popularitySwitch, setPopularitySwitch] = useState(false);
   const products = useAppSelector((state) => state.products);
   const dispatch = useAppDispatch();
   const { t } = useTranslation();

   const [brands, setBrands] = useState<string[]>([]);

   useEffect(() => {
      setPages(Math.ceil(filteredProducts.length / itemCount));

      const pageProducts = filteredProducts.slice(
         (currentPage - 1) * itemCount,
         currentPage * itemCount
      );
      setPageProducts(pageProducts);

      const filteredBrands = products.products.reduce((current: string[], item: TProduct) => {
         if (!current.includes(item.brand)) {
            current.push(item.brand);
         }
         return current;
      }, []);

      setBrands(filteredBrands);
   }, [itemCount, pages, filteredProducts, currentPage]);

   useEffect(() => {
      setFilteredProducts(products.products);
   }, [products]);

   useEffect(() => {
      dispatch(fetchProducts(category as string));
   }, [dispatch]);

   const handleSearch = () => {
      setCurrentPage(1);
      let searched = products.products.filter((el) => {
         if (
            el.name.toLowerCase().startsWith(filterName.toLowerCase()) &&
            el.price > +minPrice &&
            el.price < +maxPrice &&
            (el.gender === gender || gender === 'all') &&
            (el.brand === brand || brand === 'all')
         ) {
            return el;
         }
      });
      if (popularitySwitch) {
         searched = searched.sort((a, b) => b.views - a.views);
         console.log(searched);
      }
      setFilteredProducts(searched);
   };

   const handleChangeGender = (event: SelectChangeEvent) => {
      setGender(event.target.value as string);
   };

   const handleChangeBrand = (event: SelectChangeEvent) => {
      setBrand(event.target.value as string);
   };

   return (
      <div
         style={{
            background: '#1A202C',
            minHeight: '100vh'
         }}
      >
         <Container>
            <div
               style={{
                  border: '3px solid #7094A6',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  marginRight: '70px'
               }}
               className='searchWrapper'
            >
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField
                     id='standard-basic'
                     label={t('search')}
                     variant='standard'
                     value={filterName}
                     style={{ minWidth: '250px' }}
                     onChange={(e) => {
                        setFilterName(e.target.value);
                     }}
                  />
                  <Button
                     onClick={handleSearch}
                     style={{
                        padding: '10px',
                        marginLeft: '10px',
                        color: '#666666',
                        border: '2px solid #7094A6',
                        backgroundColor: 'white',
                        fontSize: '14px'
                     }}
                     variant='outlined'
                  >
                     {t('search')}
                  </Button>
               </div>
               <FormControl style={{ width: '100px' }}>
                  <InputLabel>{t('count')}</InputLabel>
                  <Select
                     value={itemCount}
                     label={t('count')}
                     onChange={(e) => setItemCount(+e.target.value)}
                  >
                     <MenuItem value={6}>6</MenuItem>
                     <MenuItem value={9}>9</MenuItem>
                     <MenuItem value={12}>12</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <br />
            <div className='productsWrapper'>
               <div
                  className='filter'
                  style={{
                     backgroundColor: 'white',
                     border: '3px solid #7094A6',
                     borderRadius: '10px',
                     padding: '20px',
                     height: '400px'
                  }}
               >
                  <br />
                  <InputLabel style={{ textAlign: 'center' }}>{t('filter')}</InputLabel>
                  <br />
                  <Box sx={{ minWidth: 120 }}>
                     <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>{t('brand')}</InputLabel>
                        <Select
                           labelId='demo-simple-select-label'
                           id='demo-simple-select'
                           value={brand}
                           label={t('brand')}
                           onChange={handleChangeBrand}
                        >
                           {brands.map((brand) => {
                              return (
                                 <MenuItem key={brand} value={brand}>
                                    {brand}
                                 </MenuItem>
                              );
                           })}
                           <MenuItem value={'all'}>{t('all')}</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
                  <br />
                  <Box sx={{ minWidth: 120 }}>
                     <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>{t('gender')}</InputLabel>
                        <Select
                           labelId='demo-simple-select-label'
                           id='demo-simple-select'
                           value={gender}
                           label={t('gender')}
                           onChange={handleChangeGender}
                        >
                           <MenuItem value={'Male'}>{t('male')}</MenuItem>
                           <MenuItem value={'Female'}>{t('female')}</MenuItem>
                           <MenuItem value={'all'}>{t('all')}</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
                  <Box
                     style={{
                        padding: '20px',
                        borderRadius: '5px',
                        marginLeft: '-15px'
                     }}
                  >
                     <InputLabel id='demo-simple-select-label'>{t('price')}</InputLabel>
                     <TextField
                        id='standard-basic'
                        placeholder='0'
                        value={minPrice}
                        variant='standard'
                        onChange={(e) => {
                           setMinPrice(e.target.value);
                        }}
                     />
                     <TextField
                        id='standard-basic'
                        placeholder='10000000'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        variant='standard'
                     />

                     <Box style={{ margin: '20px 0' }}>
                        <FormControlLabel
                           control={
                              <Switch
                                 onChange={() => {
                                    console.log(!popularitySwitch);
                                    setPopularitySwitch(!popularitySwitch);
                                 }}
                                 checked={popularitySwitch}
                              />
                           }
                           label={t('sortByPpopularity')}
                        />
                     </Box>
                  </Box>
               </div>
               <Grid container justifyContent='center' sx={{ margin: '-20px 4px 20px 4px' }}>
                  <Grid
                     container
                     display={'flex'}
                     spacing={{ xs: 2, md: 16 }}
                     justifyContent='center'
                     marginBottom={'2rem'}
                  >
                     {products.isLoading ? (
                        <Box sx={{ display: 'flex' }}>
                           <CircularProgress sx={{ width: '100%' }} />
                        </Box>
                     ) : products.isError ? (
                        <Typography>Something went wrong</Typography>
                     ) : !products.products.length ? (
                        <span>Nothing found</span>
                     ) : (
                        pageProducts.map((product) => {
                           return <ProductItem key={product.id} product={product} />;
                        })
                     )}
                  </Grid>
                  {!products.isLoading ? (
                     <MyPagination
                        onChange={setCurrentPage}
                        pages={pages}
                        currentPage={currentPage}
                     />
                  ) : null}
               </Grid>
            </div>
         </Container>
      </div>
   );
}
