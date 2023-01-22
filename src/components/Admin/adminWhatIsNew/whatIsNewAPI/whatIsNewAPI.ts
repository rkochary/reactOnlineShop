import { db } from '../../../../firebase';
import { getDocs, collection, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { TSales } from '../../../../types';

// export async function addSales () {
//    let reserve:any[] = [];
//    const data = [{id:'asd', count: 0},{id:'qwe', count: 0},{id:'dfg', count: 0},];
//    const getNewSales = await getDocs(collection(db, '/newSales'));
//    getNewSales.forEach(el => {
//        if (el.data().newSales) {
//            reserve = el.data().newSales;
//        }
//    });
//    for (const res of reserve) {
//        for (const dt of data ) {
//            if (res.id === dt.id) {
//                dt.count += res.count;
//            }
//        }
//    }
//    const passData = await setDoc(doc(db, 'newSales', 'newSales'), {newSales: data}, {merge:false})
// }

export async function getLessProdId(): Promise<string[]> {
   let arrLessProdId: string[] = [];
   const notifications = await getDocs(collection(db, '/notifications'));
   notifications.forEach((doc) => {
      if (doc.data().lessProducts) {
         arrLessProdId = doc.data().lessProducts;
      }
   });
   console.log('databaseId ', arrLessProdId);
   return arrLessProdId;
}

export async function getOldUsersId(): Promise<string[]> {
   let arrPrevUsersId: string[] = [];
   const notifications = await getDocs(collection(db, '/notifications'));
   notifications.forEach((doc) => {
      if (doc.data().newUsers) {
         arrPrevUsersId = doc.data().newUsers;
      }
   });
   return arrPrevUsersId;
}

export async function getOldSalesId () :Promise<TSales[]>  {
   const arrPrevSalesId = <TSales[]> []; 
   const notifications = await getDocs(collection(db, '/newSales'));
   notifications.forEach((doc) => {     
         arrPrevSalesId.push(doc.data() as TSales);
   });
   return arrPrevSalesId;
}

export async function setLessProdIdInDatabase(newData: string[]): Promise<void> {
   let id = '';
   const response = await getDocs(collection(db, 'notifications'));
   response.forEach((doc) => {
      if (doc.data().lessProducts) id = doc.id;
   });
   setDoc(doc(db, '/notifications', id), { lessProducts: newData }, { merge: true });
}

// export async function cleanNewSalesData () {
//    const arrId: string[] = [];
//    const notifications = await getDocs(collection(db, '/newSales'));
//    notifications.forEach((doc) => {     
//       arrId.push(doc.id);
//    });
//    console.log('arrId', arrId);
//    arrId.forEach(id => deleteDoc(doc(db, '/newSales', `${id}`)));
// }
// //cleanNewSalesData();

export async function setNewUsersIdInDatabase(newData: string[]): Promise<void> {
   let id = '';
   let finalyData: string[] = [];
   const response = await getDocs(collection(db, 'notifications'));
   response.forEach((doc) => {
      if (doc.data().newUsers) {
         id = doc.id;
         finalyData = [...doc.data().newUsers, ...newData];
      }
   });
   setDoc(doc(db, '/notifications', id), { newUsers: finalyData }, { merge: true });
}
