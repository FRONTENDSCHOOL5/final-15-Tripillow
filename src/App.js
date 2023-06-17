import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Product from './Pages/Product/Product';
import ProductDetail from './Pages/Product/ProductDetail';
import AddProduct from './Pages/Product/AddProduct';
import Chat from './Pages/Chat/Chat';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/product' element={<Product />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}
export default App;
