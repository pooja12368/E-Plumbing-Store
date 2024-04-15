import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Customers from './pages/Customers';
import ViewCart from './pages/ViewCart';
import MyOrders from './pages/MyOrders';
import Orders from './pages/Orders';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <div className="App">
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      />
      <BrowserRouter>      
      <NavBar />
        <Routes>
          <Route element={<Home />} path="/" exact />                    
          <Route element={<Home />} path="/cats/:pcat" />                    
          <Route element={<LoginPage />} path="/login" />                    
          <Route element={<RegisterPage/>} path="/register"/>                                                                                                                                          
          <Route element={<Profile/>} path="/profile"/>                                                                                                                                          
          <Route element={<Customers/>} path="/customers"/>                                                                                                                                          
          <Route element={<Categories/>} path="/categories"/>                                                                                                                                          
          <Route element={<Products/>} path="/products"/>                                                                                                                                          
          <Route element={<AddProduct/>} path="/add-product"/> 
          <Route element={<EditProduct/>} path="/edit/:prodid"/> 
          <Route element={<ViewCart/>} path="/cart" />                                                                                                                                                  
          <Route element={<MyOrders/>} path="/myorders" />                                                                                                                                                  
          <Route element={<Orders/>} path="/orders" />                                                                                                                                                  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
