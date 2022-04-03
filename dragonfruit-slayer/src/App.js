import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoppingCart from './Components/shopping-cart/ShoppingCart';
import ErrorPage from './Components/404';
import { useEffect, useState } from 'react';
import Shop from './Components/shop/Shop';
import Register from './Components/register/Register'
import Login from './Components/login/Login';
import WelcomePage from './Components/welcome-page/WelcomePage';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {fetchAllItems()}, [])

  async function fetchAllItems () {
    try{
      let response  = await fetch('http://localhost:5000/items')
      console.log(response.statusText)
      let items     = await response.json();
      setItems(items)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Shop items={items}/>} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<ErrorPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
