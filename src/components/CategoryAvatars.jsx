import React from 'react';
import './CategoryAvatars.css';
import snakePlant from '../assets/images/gallery/snake-plant.png';
import jadePlant from '../assets/images/gallery/jede-plant.png';
import plantSmall1 from '../assets/images/plant-small-1.png';
import plantSmall2 from '../assets/images/plant-small-2.png';

// Importing placeholder images using absolute paths or public folder if dynamic
// For now using placeholders or reusable assets
// You can replace these with actual imports later
const categories = [
    { id: 'all', name: 'All', image: 'https://via.placeholder.com/80?text=All' }, // Placeholder for All
    { id: 'Best Selling', name: 'Best Seller', image: snakePlant },
    { id: 'Medicinal', name: 'Medicinal', image: jadePlant },
    { id: 'Astrology', name: 'Lucky Plants', image: plantSmall1 }, // Mapped to backend 'Astrology' or 'Lucky'? Using Astrology based on enum
    { id: 'Air Purifying', name: 'Air Purifier', image: plantSmall2 },
    { id: 'Succulent', name: 'Succulents', image: 'https://via.placeholder.com/80?text=Succulent' },
    { id: 'Flower', name: 'Flowering', image: 'https://via.placeholder.com/80?text=Flower' }
];

const CategoryAvatars = ({ onSelectCategory, selectedCategory }) => {
    return (
        <section className="category-avatars-section">
            <h2 className="section-title">Explore Categories</h2>
            <div className="avatars-container">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className={`avatar-item ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(cat.id === 'all' ? '' : cat.id)}
                    >
                        <div className={`avatar-circle ${selectedCategory === cat.id ? 'selected-circle' : ''}`}>
                            <img
                                src={cat.image}
                                alt={cat.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/80?text=Plant';
                                }}
                            />
                        </div>
                        <span className={`avatar-name ${selectedCategory === cat.id ? 'selected-text' : ''}`}>
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryAvatars;
