import { Card } from '@mui/material';

export default function ContactItemMap() {
   return (
      <Card
         sx={{
            width: 500,
            margin: '20px auto',
            padding: '20px 5px',
            border: '3px solid #212834',
            background: 'rgba(33,40,52,0.1)'
         }}
      >
         <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6094.943834279641!2d44.4880679!3d40.1985643!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce69a1b0d77%3A0x31ea9da813693c2e!2sACA(Armenian%20Code%20Academy)!5e0!3m2!1sru!2s!4v1629828235012!5m2!1sru!2s'
            width={500}
            height={400}
            allowFullScreen
         ></iframe>
      </Card>
   );
}
