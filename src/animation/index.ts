import { keyframes } from '@mui/system';

export const aboutMemberSlider = keyframes`
0%{
    transform : perspective(1000px) rotateY(0deg)
}

100%{
    transform : perspective(1000px) rotateY(360deg)
}

`;

export const animate = keyframes`
0%{
   transform: translate(-50%,-50%) rotate(0deg)
}

100%{
   transform: translate(-50%,-50%) rotate(360deg)
}    

`;

export const secondAnimate = keyframes`
0%{
   transform: translate(-50%,-50%) rotate(360deg)
}

100%{
   transform: translate(-50%,-50%) rotate(0deg)
}    

`;
