import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

type TAccordionItemProps = {
   question: string;
   answer: string;
   handleChange: (id: string) => (e: React.SyntheticEvent, isExpanded: boolean) => void;
   expanded: boolean | string;
   id: string;
};

export default function AccordionItem({
   question,
   answer,
   handleChange,
   expanded,
   id
}: TAccordionItemProps) {
   return (
      <Accordion expanded={id === expanded} onChange={handleChange(id)}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
         >
            <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>
               {question}
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
            <Typography>{answer}</Typography>
         </AccordionDetails>
      </Accordion>
   );
}
