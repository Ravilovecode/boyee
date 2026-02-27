import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Products from '../components/Products'
import CategoryAvatars from '../components/CategoryAvatars'
import PromoCarousel from '../components/PromoCarousel'

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  return (
    <div style={{ paddingBottom: '80px', paddingTop: '20px' }}> {/* Padding for bottom nav and top navbar */}
      <CategoryAvatars
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <PromoCarousel />

      {searchQuery ? (
        <Products
          searchQuery={searchQuery}
          title={`Search Results for "${searchQuery}"`}
          showViewAll={false}
        />
      ) : selectedCategory ? (
        <Products
          selectedCategory={selectedCategory}
          title={selectedCategory === 'Best Selling' ? 'Bestsellers' : `${selectedCategory} Plants`}
          showViewAll={false}
        />
      ) : (
        <>
          <Products selectedCategory="Best Selling" title="Bestsellers" />
          <Products selectedCategory="Indoor" title="Indoor Plants" />
          <Products selectedCategory="Medicinal" title="Medicinal Plants" />
          <Products selectedCategory="Astrology" title="Lucky Plants" />
          <Products selectedCategory="Air Purifying" title="Air Purifying Plants" />
          <Products selectedCategory="Succulent" title="Succulents" />
          <Products selectedCategory="Flower" title="Flowering Plants" />
        </>
      )}
    </div>
  )
}

export default ProductsPage
