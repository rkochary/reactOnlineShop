import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

import { db } from '../../../firebase';
import { TProduct } from '../../../types';

export async function addProduct(categoryName: string, newData: TProduct) {
   const docRef = doc(db, `${categoryName}`);
   const result = await setDoc(docRef, newData, { merge: true });
   return result;
}

export async function getData() {
   const arrayProducts: TProduct[] = [];

   const watchQuerySnapshot /* QuerySnapshot<DocumentData */ = await getDocs(
      collection(db, 'watches')
   );
   watchQuerySnapshot.forEach((doc) => {
      const { price, color, name, gender, imgUrl, count, views, brand, quantity } = doc.data();
      arrayProducts.push({
         id: doc.id,
         category: 'watches',
         price,
         name,
         gender,
         imgUrl,
         color,
         count,
         views,
         brand,
         quantity
      });
   });

   const accessoriesQuerySnapshot = await getDocs(collection(db, 'accessories'));
   accessoriesQuerySnapshot.forEach((doc) => {
      const { price, name, gender, color, imgUrl, count, views, brand, quantity } = doc.data();
      arrayProducts.push({
         id: doc.id,
         category: 'accessories',
         price,
         name,
         gender,
         imgUrl,
         color,
         count,
         views,
         brand,
         quantity
      });
   });

   const jewelleriesQuerySnapShot = await getDocs(collection(db, 'jewelleries'));
   jewelleriesQuerySnapShot.forEach((doc) => {
      const { price, name, gender, color, imgUrl, count, views, brand, quantity } = doc.data();
      arrayProducts.push({
         id: doc.id,
         category: 'jewelleries',
         price,
         name,
         gender,
         imgUrl,
         color,
         count,
         views,
         brand,
         quantity
      });
   });
   return arrayProducts;
}

