import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoppingCart from './Components/shopping-cart/ShoppingCart';
import ErrorPage from './Components/404';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<ErrorPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
