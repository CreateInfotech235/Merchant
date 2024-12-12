// import React from 'react';
// import styled from 'styled-components';

// const Button = () => {
//   return (
//     <StyledWrapper>
//       <button className="button">
//         <p className="button__text">
//         {Array.from('MERCHANT DASHBOARD').map((char, index) => (
//             <span key={index} style={{ '--index': index }}>{char}</span>
//           ))}
//         </p>
//         <div className="button__circle">
//           <svg
//             viewBox="0 0 14 15"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="button__icon"
//             width={14}
//           >
//             <path
//               d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
//               fill="currentColor"
//             />
//           </svg>
//           <svg
//             viewBox="0 0 14 15"
//             fill="none"
//             width={14}
//             xmlns="http://www.w3.org/2000/svg"
//             className="button__icon button__icon--copy"
//           >
//             <path
//               d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//       </button>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .button {
//     cursor: pointer;
//     border: none;
//     background: #7808d0;
//     color: #fff;
//     width: 80px;
//     height: 80px;
//     border-radius: 50%;
//     overflow: hidden;
//     position: relative;
//     display: grid;
//     place-content: center;
//     transition: background 300ms, transform 200ms;
//     font-weight: 600;
//   }

//   .button__text {
//     position: absolute;
//     inset: 0;
//     animation: text-rotation 8s linear infinite;

//     > span {
//       position: absolute;
//       transform: rotate(calc(19deg * var(--index)));
//       inset: 0px;
//     }
//   }

//   .button__circle {
//     position: relative;
//     width: 40px;
//     height: 40px;
//     overflow: hidden;
//     background: #fff;
//     color: #7808d0;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .button__icon--copy {
//     position: absolute;
//     transform: translate(-150%, 150%);
//   }

//   .button:hover {
//     background: #000;
//     transform: scale(1.05);
//   }

//   .button:hover .button__icon {
//     color: #000;
//   }

//   .button:hover .button__icon:first-child {
//     transition: transform 0.3s ease-in-out;
//     transform: translate(150%, -150%);
//   }

//   .button:hover .button__icon--copy {
//     transition: transform 0.3s ease-in-out 0.1s;
//     transform: translate(0);
//   }

//   @keyframes text-rotation {
//     to {
//       rotate: 360deg;
//     }
//   }
// `;

// export default Button;
// import React from 'react';
// import styled from 'styled-components';

// const Button = () => {
//   return (
//     <StyledWrapper>
//       <button className="learn-more">
//         <span className="circle" aria-hidden="true">
//           <span className="icon arrow" />
//         </span>
//         <span className="button-text">Dashboard</span>
//       </button>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   button {
//    position: relative;
//    display: inline-block;
//    cursor: pointer;
//    outline: none;
//    border: 0;
//    vertical-align: middle;
//    text-decoration: none;
//    background: transparent;
//    padding: 0;
//    font-size: inherit;
//    font-family: inherit;
//   }

//   button.learn-more {
//    width: 12rem;
//    height: auto;
//   }

//   button.learn-more .circle {
//    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
//    position: relative;
//    display: block;
//    margin: 0;
//    width: 3rem;
//    height: 3rem;
//    background: #282936;
//    border-radius: 1.625rem;
//   }

//   button.learn-more .circle .icon {
//    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
//    position: absolute;
//    top: 0;
//    bottom: 0;
//    margin: auto;
//    background: #fff;
//   }

//   button.learn-more .circle .icon.arrow {
//    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
//    left: 0.625rem;
//    width: 1.125rem;
//    height: 0.125rem;
//    background: none;
//   }

//   button.learn-more .circle .icon.arrow::before {
//    position: absolute;
//    content: "";
//    top: -0.29rem;
//    right: 0.0625rem;
//    width: 0.625rem;
//    height: 0.625rem;
//    border-top: 0.125rem solid #fff;
//    border-right: 0.125rem solid #fff;
//    transform: rotate(45deg);
//   }

//   button.learn-more .button-text {
//    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
//    position: absolute;
//    top: 0;
//    left: 0;
//    right: 0;
//    bottom: 0;
//    padding: 0.75rem 0;
//    margin: 0 0 0 1.85rem;
//    color: #282936;
//    font-weight: 700;
//    line-height: 1.6;
//    text-align: center;
//    text-transform: uppercase;
//   }

//   button:hover .circle {
//    width: 100%;
//   }

//   button:hover .circle .icon.arrow {
//    background: #fff;
//    transform: translate(1rem, 0);
//   }

//   button:hover .button-text {
//    color: #fff;
//   }`;

// export default Button;
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <a href="#" className="btn-shine">Dashboard</a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn-shine {
    position: absolute;
    top: 50%;
    left: -50px;
    transform: translate(-50%, -50%);
    padding: 12px 48px;
    color: #fff;
    background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #3c3c3c 20%);
    background-position: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite linear;
    animation-fill-mode: forwards;
    -webkit-text-size-adjust: none;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    white-space: nowrap;
    font-family: "Poppins", sans-serif;
  }
  @-moz-keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 180px;
    }
    100% {
      background-position: 180px;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 180px;
    }
    100% {
      background-position: 180px;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 180px;
    }
    100% {
      background-position: 180px;
    }
  }
  @keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 180px;
    }
    100% {
      background-position: 180px;
    }
  }`;

export default Button;
