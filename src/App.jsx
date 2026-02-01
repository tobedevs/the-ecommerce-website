import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { Navbar } from './Component/Navbar.jsx'
import SummaryPage from './Pages/SummaryPage.jsx';
import { Footer } from './Component/Footer.jsx'
import { AppProvider } from "./AppContext/AppContext.jsx";
import {ProductProvider} from './AppContext/ProductContext.jsx';
import { CartProvider } from './AppContext/CartContext.jsx';
import { ScrollToTop } from './AppContext/ScrollContext.jsx';
import './App.css'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='overflow-x-clip'>
      <AppProvider>
      <ProductProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/summary' element={<SummaryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <Toaster position="top-center" />
          <Footer />
        </Router>
      </CartProvider>
      </ProductProvider>
      </AppProvider>
      
    </div>
  )
}

export default App
