import { FormEvent, useEffect, useState } from 'react';
//Actions
import { signIn, signUp } from '../../redux/userSlice';
//Hooks
import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../hooks/useNotify';
import { useAppDispatch, useAppSelector } from '../../store';
//Types
import { AccStatus, notificationTypes } from '../../types';
//Styles
import '../../styles/loginStyle.css';
import { firebaseErrorCatch } from '../../utils/firebaseErrorCatch';

const Login = () => {
   const [showSignIn, setShowSignIn] = useState(true);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const userState = useAppSelector((state) => state.user);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const notify = useNotify();

   const signUpActive = !!email && !!password && !!confirmPassword && !!firstName && !!lastName;

   useEffect(() => {
      if (userState.isLogged) {
         if (userState.status === AccStatus.ADMIN) navigate('/admin');
         else navigate('/shop');
      }
   }, [userState.isLogged]);

   const handleSignIn = async (e: FormEvent): Promise<void> => {
      e.preventDefault();
      await dispatch(signIn({ email, password } as { email: string; password: string }))
         .unwrap()
         .catch((e) => firebaseErrorCatch(e.code));
   };

   const handleSignUp = async (e: FormEvent) => {
      e.preventDefault();
      if (!signUpActive) {
         notify(notificationTypes.ERROR, 'Fill all fields');
         return;
      }
      if (password !== confirmPassword) {
         firebaseErrorCatch('auth/different-passwords');
         return;
      }
      await dispatch(
         signUp({ email, password, firstName, lastName } as {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
         })
      )
         .unwrap()
         .catch((e) => firebaseErrorCatch(e.code));
   };

   return (
      <div className='main-container'>
         <div
            className={showSignIn ? 'register-container' : 'right-panel-active'}
            id='register-container'
         >
            <div className='form-container sign-up-container'>
               <form>
                  <h1>Create Account</h1>
                  <div className='infield'>
                     <input
                        type='text'
                        placeholder='Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                  </div>
                  <div className='infield'>
                     <input
                        type='text'
                        placeholder='LastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </div>
                  <div className='infield'>
                     <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className='infield'>
                     <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className='infield'>
                     <input
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>
                  <button onClick={handleSignUp}>Sign Up</button>
               </form>
            </div>
            <div className='form-container sign-in-container'>
               <form>
                  <h1>Sign in</h1>
                  <div className='infield'>
                     <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className='infield'>
                     <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <button onClick={handleSignIn}>Sign In</button>
               </form>
            </div>
            <div className='overlay-container' id='overlayCon'>
               <div className='overlay'>
                  <div className='overlay-panel overlay-left'>
                     <h1>Welcome Back!</h1>
                     <p>To keep connected with us please login with your personal info</p>
                     <button>Sign In</button>
                  </div>
                  <div className='overlay-panel overlay-right'>
                     <h1>Hello, Friend!</h1>
                     <p>Enter your personal details and start shopping with us</p>
                     <button>Sign Up</button>
                  </div>
               </div>
               <button id='overlayBtn' onClick={() => setShowSignIn(!showSignIn)}></button>
            </div>
         </div>
      </div>
   );
};

export default Login;
