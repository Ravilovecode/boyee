import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import './App.css'

// Lazy load pages — each becomes a separate JS chunk
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const CheckoutPage = lazy(() => import('./pages/Checkout'))
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'))
const MyOrdersPage = lazy(() => import('./pages/MyOrdersPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order/:id" element={<OrderDetailsPage />} />
                    <Route path="/myorders" element={<MyOrdersPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/login" element={<AccountPage />} />
                  </Routes>
                </Suspense>
              </main>
              <BottomNav />
            </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
