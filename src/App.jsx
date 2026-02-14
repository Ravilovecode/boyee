import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import './App.css'

// Lazy load pages — each becomes a separate JS chunk
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))

function App() {
  return (
    <AuthProvider>
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
              </Routes>
            </Suspense>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
