import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCarousel from './components/ProductCarousel'
import BottomNav from './components/BottomNav'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ProductCarousel />
      <BottomNav />
    </div>
  )
}

export default App
