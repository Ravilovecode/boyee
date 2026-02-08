import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
