import { Button, CircularProgress } from '@mui/material';

import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

import { useEffect, useState } from 'react';

import getData from '../../../api/api';
import { db } from '../../../firebase';

import { TFaqItem } from '../../About/accordion/Accordion';

import FaqModalWindow from '../adminFAQ/faqModalWindow/FaqModalWindow';

import { passCurrentFAQ, changeFaqModal } from '../../../redux/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../store';

function AdminFAQ() {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isDisabled, setIsDisabled] = useState<boolean>(true);
   const [questions, setQuestions] = useState<TFaqItem[]>([]);
   const [newQuestion, setNewQuestion] = useState<string>('');
   const [newAnswer, setNewAnswer] = useState<string>('');

   const dispatch = useAppDispatch();
   const faqModal = useAppSelector((state) => state.admin.faqModal);
   const currentFAQ = useAppSelector((state) => state.admin.currentFAQ);

   useEffect(() => {
      const faq: TFaqItem[] = [];
      getData('faq')
         .then((res) => {
            res.docs.forEach((doc) => {
               const { question, answer } = doc.data();
               const id = doc.id;
               faq.push({ question, answer, id });
            });
         })
         .then(() => {
            setIsLoading(false);
            setQuestions(faq);
         });
   }, [currentFAQ]);

   useEffect(() => {
      if (newAnswer.trim().length && newQuestion.trim().length) {
         setIsDisabled(false);
      } else {
         setIsDisabled(true);
      }
   }, [newAnswer, newQuestion]);

   const deleteQuestion = (id: string) => {
      deleteDoc(doc(db, 'faq', id)).then(() => {
         setQuestions(questions.filter((el) => el.id !== id));
      });
   };

   const changeQuestion = (faq: TFaqItem) => {
      dispatch(changeFaqModal());
      dispatch(passCurrentFAQ(faq));
   };

   const addQuestion = () => {
      const newFaqItem: Omit<TFaqItem, 'id'> = { question: newQuestion, answer: newAnswer };
      addDoc(collection(db, 'faq'), newFaqItem)
         .then((res) => {
            setQuestions([{ ...newFaqItem, id: res.id }, ...questions]);
         })
         .then(() => {
            setNewAnswer('');
            setNewQuestion('');
         });
   };
   
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap'
         }}
      >
         <h3>FAQ</h3>
         {!isLoading && (
            <div className='add_faq'>
               <input
                  type='text'
                  value={newQuestion}
                  className='add_faq_question'
                  placeholder='Fill the question'
                  onChange={(e) => setNewQuestion(e.target.value)}
               />
               <textarea
                  value={newAnswer}
                  className='add_faq_answer'
                  placeholder='Fill the answer'
                  onChange={(e) => setNewAnswer(e.target.value)}
               />
               <div className='add_btn_frame'>
                  <Button
                     onClick={addQuestion}
                     disabled={isDisabled}
                     variant='contained'
                     color='success'
                  >
                     Add
                  </Button>
               </div>
               <br />
               <hr />
            </div>
         )}
         {isLoading ? (
            <CircularProgress />
         ) : (
            questions.map((el) => {
               return (
                  <div className='faq_frame' key={el.id}>
                     <div>
                        <h4>Question: </h4>
                        {el.question}
                     </div>
                     <br />
                     <div>
                        <h4>Answer: </h4>
                        {el.answer}
                     </div>
                     <br />
                     <div className='dlt_chng_frame'>
                        <Button
                           onClick={() => deleteQuestion(el.id)}
                           variant='contained'
                           color='error'
                           size='small'
                        >
                           Delete
                        </Button>

                        <Button onClick={() => changeQuestion(el)} variant='contained' size='small'>
                           Change
                        </Button>
                     </div>
                  </div>
               );
            })
         )}
         {faqModal && <FaqModalWindow />}
      </div>
   );
}

export default AdminFAQ;
