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
import SignupPage from "./Pages/SignupPage.jsx";
import LogInPage from "./Pages/LogInPage.jsx";
import Admin from "./Admin.jsx";
import './App.css'
import { Toaster } from 'react-hot-toast';
import MainLayout from "./Layout/MainLayout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import AdminRoute from "./AppContext/AdminRoute.jsx";

function App() {
  return (
    <div className='overflow-x-clip'>
      <AppProvider>
      <ProductProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/homepage' element={<HomePage />} />
              <Route path='/summary' element={<SummaryPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
            </Route>

            <Route element={<AuthLayout />} >
              <Route path="/" element={<SignupPage />} />
              <Route path="/Login" element={<LogInPage />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
            </Route>
          </Routes>
          <Toaster position="top-center" />
        </Router>
      </CartProvider>
      </ProductProvider>
      </AppProvider>
      
    </div>
  )
}

export default App
