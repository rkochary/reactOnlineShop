import { Triangle } from 'react-loader-spinner';
export default function SuspenseComponent() {
   return (
      <div
         style={{
            height: '100vh',
            background: '#1A202C',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
      >
         <Triangle
            height='80'
            width='80'
            color='#5082FC'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            visible={true}
         />
      </div>
   );
}
