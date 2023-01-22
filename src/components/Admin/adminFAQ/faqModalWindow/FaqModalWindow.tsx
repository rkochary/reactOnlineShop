import { useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

import { changeFaqModal, passCurrentFAQ } from '../../../../redux/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../../store';

import Button from '@mui/material/Button';

function FaqModalWindow() {
   const currentFAQ = useAppSelector((state) => state.admin.currentFAQ);
   const dispatch = useAppDispatch();

   const [answer, setAnswer] = useState<string>(currentFAQ.answer);
   const [question, setQuestion] = useState<string>(currentFAQ.question);
   const id = currentFAQ.id;

   const handleCancelBtn = () => {
      dispatch(changeFaqModal());
   };

   const handleUpdateBtn = () => {
      setDoc(
         doc(db, 'faq', `${id}`),
         { question, answer },
         {
            merge: true
         }
      ).then(() => {
         dispatch(passCurrentFAQ({ question, answer, id }));
      });
      dispatch(changeFaqModal());
   };

   return (
      <div className='faq_modal'>
         <div className='faq_modal_child'>
            <h3>Change answer & question</h3>
            <hr />
            <hr />
            <br />
            <div className='question_frame'>
               <h4>Question:</h4>
               <input
                  className='question'
                  value={question}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                  type='text'
               />
            </div>
            <br />
            <div className='answer_frame'>
               <h4>Answer:</h4>
               <textarea
                  className='answer'
                  value={answer}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                     setAnswer(e.target.value)
                  }
               />
            </div>

            <div className='buttons_frame'>
               <Button onClick={handleUpdateBtn} variant='contained' color='success' size='small'>
                  Update
               </Button>

               <Button onClick={handleCancelBtn} variant='contained' size='small'>
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   );
}
export default FaqModalWindow;
