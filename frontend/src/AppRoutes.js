import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import WaterPage from './pages/Water/WaterPage';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import PaymentPage from './pages/Payment/PaymentPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import FAQPage from './pages/FAQ/FAQPage';
import OrdersPage from './pages/Orders/OrdersPage';
export default function AppRoutes() {
  return (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/search/:searchTerm" element={<HomePage />} />
    <Route path="/water/:id" element={<WaterPage />} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/checkout" element={<AuthRoute> <CheckoutPage/> </AuthRoute>} />
    <Route path="/payment" element={<AuthRoute> <PaymentPage/> </AuthRoute>} />
    <Route path="/profile" element={<AuthRoute> <ProfilePage/> </AuthRoute>} />
    <Route path="/about-us" element={<AboutUsPage/>}/>
    <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
    <Route path="/frequently-asked-questions" element={<FAQPage/>}/>
    <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}
