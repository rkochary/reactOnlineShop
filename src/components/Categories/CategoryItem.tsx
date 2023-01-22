import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//Styles
import {
   Category,
   CategoryDetail,
   CategoryContent,
   CategoryImageBox,
   CategoryImage,
   CategoryInfo
} from './styles';

type TCategoryItemProps = {
   category: {
      name: string;
      imgUrl: string;
      description: string;
      id: string;
   };
};

const CategoryItem = ({ category }: TCategoryItemProps) => {
   const { t } = useTranslation();

   return (
      <Link to={`/shop/${category.name.toLowerCase()}`}>
         <Category>
            <CategoryContent></CategoryContent>
            <CategoryImageBox>
               <CategoryImage src={category.imgUrl} alt={category.name} />
            </CategoryImageBox>
            <CategoryInfo>
               <CategoryDetail variant='h5' className='category-name'>
                  {t(category.name.toLowerCase())}
               </CategoryDetail>
            </CategoryInfo>
         </Category>
      </Link>
   );
};

export default CategoryItem;
