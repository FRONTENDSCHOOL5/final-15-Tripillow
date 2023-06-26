import { Routes, Route, Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile/Profile';
import Product from './Pages/Product/Product';
import ProductDetail from './Pages/Product/ProductDetail';
import AddProduct from './Pages/Product/AddProduct';
import Chat from './Pages/Chat/Chat';
import ChatDetail from './Pages/Chat/ChatDetail';
import NotFound from './Pages/NotFound';
import ProductModification from './Pages/Product/ProductModification';
import Post from './Pages/Post/Post';
import Followers from './Pages/Profile/Followers';
import PostDetail from './Pages/Post/PostDetail';
import UserProfileSetting from './Pages/Profile/UserProfileSetting';
import PostModification from './Pages/Post/PostModification';
import ProtectRoute from './Utils/ProtectRoute/ProtectRoute';
import Setting from './Pages/Profile/Setting';

function App() {
  return (
    <RecoilRoot>
      <>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            element={
              <ProtectRoute>
                <Outlet />
              </ProtectRoute>
            }
          >
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:accountname' element={<Profile />} />
            <Route path='/profile/edit' element={<UserProfileSetting />} />
            <Route path='/profile/followers' element={<Followers />} />
            <Route path='/profile/:accountname/followers' element={<Followers />} />
            <Route path='/profile/followings' element={<Followers />} />
            <Route path='/profile/:accountname/followings' element={<Followers />} />
            <Route path='/profile/setting' element={<Setting />} />
            <Route path='/post' element={<Post />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/modifypost' element={<PostModification />} />
            <Route path='/product' element={<Product />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/modifyproduct' element={<ProductModification />} />
            <Route path='/product/detail/:id' element={<ProductDetail />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/chat/:username' element={<ChatDetail />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    </RecoilRoot>
  );
}
export default App;
