import { Pagination } from '@mui/material';

type TPagination = {
   currentPage: number;
   onChange: (page: number) => void;
   pages: number;
};

export default function MyPagination({ currentPage, onChange, pages }: TPagination) {
   return (
      <div
         style={{
            borderRadius: '5px',
            padding: '15px',
            color: 'red',
            backgroundColor: 'white'
         }}
      >
         <Pagination
            shape='rounded'
            showFirstButton
            showLastButton
            color='primary'
            variant='outlined'
            page={currentPage}
            onChange={(_: unknown, page: number) => {
               onChange(page);
            }}
            count={pages}
         />
      </div>
   );
}
