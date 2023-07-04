import { createGlobalStyle } from 'styled-components';
const { default: reset } = require('styled-reset');

const GlobalStyle = createGlobalStyle`
// === ROOT ====
:root {
  // height
  --vh: 100%;
  
  // Color
  --primary: #4594FF;
  --secondary: #B5D5FF;
  --light-gray: #DBDBDB;
  --gray: #C4C4C4;
  --dark-gray: #767676;
  --error: #EB5757;

  // FontSize
  --xs: 12px;
  --sm: 14px;
  --md: 16px;
  --lg: 18px;
  --xl: 20px;
  --xxl: 24px;

  font-family: 'SUITE Variable', sans-serif;
}  

// === RESET ===
${reset}

.a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

button {
  padding: 0;
  cursor: pointer;
  border: none;
  color: inherit;
  background-color: transparent;
}

a{
text-decoration: none;
    color: inherit;
}

textarea:focus, input:focus{
    outline: none;
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    border: none;
    border-radius: 0;
    padding: 0;
    box-sizing: border-box;
  }

h1 {
  margin: 0;
}

body {
  box-sizing: border-box;
  overflow-y: scroll;
  -ms-overflow-style:none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  #root {
    height: calc(var(--vh, 1vh) * 100);
    /* height: 1px; */
  }
}
`;

export default GlobalStyle;
