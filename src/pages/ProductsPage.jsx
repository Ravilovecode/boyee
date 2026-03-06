import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Products from '../components/Products'
import CategoryAvatars from '../components/CategoryAvatars'
import PromoCarousel from '../components/PromoCarousel'
const ALL_CATEGORIES = [
  'Best Selling', 'Indoor', 'Outdoor', 'Succulent', 'Herb', 'Vegetable',
  'Flower', 'Tree', 'Medicinal', 'Astrology', 'Air Purifying', 'Other',
];

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
          {ALL_CATEGORIES.map(category => (
            <Products
              key={category}
              selectedCategory={category}
              title={category === 'Best Selling' ? 'Bestsellers' : `${category} Plants`}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ProductsPage
