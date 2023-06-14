import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Product from './Pages/Product/Product';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </>
  );
}
export default App;
