//Hooks
import { useEffect, useState } from 'react';
//Redux
import { getCategories } from '../../redux/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../store';
//MUI
import { Container, Grid, Typography } from '@mui/material';
//Components
import CategoryItem from './CategoryItem';
import SuspenseComponent from '../SuspenseComponent';

export default function CategoriesList() {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<boolean>(false);
   const categoriesList = useAppSelector((state) => state.categories);
   const dispatch = useAppDispatch();

   const { categories } = categoriesList;
   useEffect(() => {
      setIsLoading(true);
      dispatch(getCategories())
         .unwrap()
         .then(() => {
            setError(false);
            setIsLoading(false);
         })
         .catch(() => {
            setIsLoading(false);
            setError(true);
         });
   }, [dispatch]);

   return (
      <div style={{ background: '#1A202C' }}>
         <Container sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Grid container justifyContent='center' sx={{ margin: '20px 4px 10px 4px' }}>
               {isLoading ? (
                  <SuspenseComponent />
               ) : error ? (
                  <Typography variant='h3'>Something went wrong</Typography>
               ) : (
                  categories.map((el) => {
                     return <CategoryItem key={Math.random()} category={el}></CategoryItem>;
                  })
               )}
            </Grid>
         </Container>
      </div>
   );
}
