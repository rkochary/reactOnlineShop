import {
   collection,
   doc,
   DocumentData,
   DocumentSnapshot,
   getDoc,
   getDocs,
   setDoc,
   deleteDoc,
   query,
   QuerySnapshot,
   where
} from 'firebase/firestore';
import { db } from '../firebase';
import { TProduct, TUser, TDeletedUser } from '../types';

const getData = async (url: string): Promise<QuerySnapshot<DocumentData>> => {
   const querySnapshot = await getDocs(collection(db, url));
   return querySnapshot;
};

export const getProducts = async (url: string): Promise<QuerySnapshot<DocumentData>> => {
   let querySnapshot = await getDocs(collection(db, url));

   querySnapshot = await getDocs(collection(db, url));
   return querySnapshot;
};

export const getUser = async (userId: string) => {
   const collRef = collection(db, 'users');
   const q = query(collRef, where('id', '==', userId));
   const snaps: QuerySnapshot<DocumentData> = await getDocs(q);
   const userRef = doc(db, 'users', snaps.docs[0].id);
   return { userRef, snaps };
};

export const getAllUsers = async () => {
   const usersArray = <TUser[]>[];
   const users = await getDocs(collection(db, 'users'));
   users.forEach((item) => usersArray.push(item.data() as TUser));
   console.log('user deleted', usersArray);
   return usersArray;
};

export async function getDeletedUsers(): Promise<TDeletedUser[]> {
   const usersArray = <TDeletedUser[]>[];
   const deletedUsers = await getDocs(collection(db, 'deletedUsers'));
   deletedUsers.forEach((item) => usersArray.push(item.data() as TDeletedUser));
   return usersArray;
}

export async function deleteData(collectionName: string, id: string) {
   deleteDoc(doc(db, `${collectionName}`, `${id}`));
}

export async function restoreUser(userData: TDeletedUser) {
   const docRef = doc(db, 'users');
   const result = await setDoc(docRef, userData, { merge: true });
   return result;
}

export async function getSales() {
   const salesArray: any[] = []; ////// <== type problem fix this!!!
   const fetchedSales = await getDocs(collection(db, '/sales'));
   fetchedSales.forEach((item) => salesArray.push(item.data()));
   return salesArray;
}

export const getProduct = async (url: string, id: string): Promise<TProduct> => {
   const snap: DocumentSnapshot<DocumentData> = await getDoc(doc(db, url, id));
   if (snap.exists()) {
      return snap.data() as TProduct;
   } else {
      console.log(11);
      throw new Error(id);
   }
};

export default getData;
