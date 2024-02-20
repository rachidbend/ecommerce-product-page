import { createGlobalStyle } from 'styled-components';
import AppLayout from './ui/AppLayout';
import ShoppingCartProvider from './contexts/ShoppingCartContext';

const styled = { createGlobalStyle };
const GlobalStyles = styled.createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    /* Primary */

    --color-orange-100: hsl(26, 100%, 55%);
    --color-orange-200: hsl(25, 100%, 94%);

    /* Neutral */

    --color-blue-100: hsl(220, 13%, 13%);
    --color-blue-200: hsl(219, 9%, 45%);
    --color-blue-300: hsl(220, 14%, 75%);
    --color-blue-400: hsl(223, 64%, 98%);
    --color-white: hsl(0, 0%, 100%);
    --color-background-overlay: hsla(0, 0%, 0%, 0.7);
    --color-grey-100: hsl(240, 9%, 91%);

    /* font family */
    --font-main: 'Kumbh Sans', sans-serif;
  }

  html {
    font-size: 62.5%;
  }
`;

function App() {
  return (
    <ShoppingCartProvider>
      <GlobalStyles />
      <AppLayout />
    </ShoppingCartProvider>
  );
}

export default App;
