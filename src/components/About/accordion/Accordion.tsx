import { useEffect, useState } from 'react';
//MUI
import { CircularProgress } from '@mui/material';
import getData from '../../../api/api';
import AccordionItem from './AccordionItem';

export type TFaqItem = {
   answer: string;
   question: string;
   id: string;
};

const AccordionPage = () => {
   const [expanded, setExpanded] = useState<string | boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [question, setQuestions] = useState<TFaqItem[]>([]);

   const handleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? id : false);
   };

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
   }, []);

   return (
      <div style={{ margin: '100px' }}>
         {isLoading ? (
            <CircularProgress />
         ) : (
            question.map((el) => {
               return (
                  <AccordionItem
                     key={el.id}
                     id={el.id}
                     answer={el.answer}
                     question={el.question}
                     handleChange={handleChange}
                     expanded={expanded}
                  />
               );
            })
         )}
      </div>
   );
};
export default AccordionPage;
