import { useState } from 'react'
import Products from '../components/Products'
import CategoryAvatars from '../components/CategoryAvatars'
import PromoCarousel from '../components/PromoCarousel'

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div style={{ paddingBottom: '80px', paddingTop: '100px' }}> {/* Padding for bottom nav and top navbar */}
      <CategoryAvatars
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <PromoCarousel />

      {selectedCategory ? (
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
