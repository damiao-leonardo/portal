import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';

import Routes from './routes/index';
import { ProductsProvider } from './hooks/useProducts';

function App() {
  return (
    <>
      <ProductsProvider>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
        <GlobalStyle/>
      </ProductsProvider>
     </>
  );
}

export default App;
