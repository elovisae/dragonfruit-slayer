import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoppingCart from './Components/shopping-cart/ShoppingCart';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
