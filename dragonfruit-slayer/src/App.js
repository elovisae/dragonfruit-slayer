import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoppingCart from './Components/shopping-cart/ShoppingCart';
import ErrorPage from './Components/404';
import { useEffect, useState } from 'react';

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
        
        <Route path="/cart" element={<ShoppingCart items={items}/>} />
        <Route path="*" element={<ErrorPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
