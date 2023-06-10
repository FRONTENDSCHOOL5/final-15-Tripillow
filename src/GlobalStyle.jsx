import { createGlobalStyle } from "styled-components";
const { default: reset } = require("styled-reset");

const GlobalStyle = createGlobalStyle`
// === ROOT ====
:root {

  // Color
  --primary-color: #6CABFF;
  --secondary-color: #B5D5FF;

  // FontSize
  --sm: 14px;
  --md: 16px;
  --lg: 20px;
}

// === RESET ===
${reset}

button {
  cursor: pointer;
  border: none;
}

a{

}

ul{

}

h1 {
  margin: 0;
}

  body {
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 0;
  border: 0;
  }
`;
export default GlobalStyle;

// npm reset
// =>
// npm normalize
// reset.css
