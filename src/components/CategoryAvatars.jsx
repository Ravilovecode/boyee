import React, { useState, useEffect } from 'react';
import './CategoryAvatars.css';
import { getCategoryAvatars } from '../services/categoryService';

const CategoryAvatars = ({ onSelectCategory, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoryAvatars();
                // Add 'All' category at the beginning
                const allCategory = { id: 'all', name: 'All', image: 'https://via.placeholder.com/80?text=All' };
                setCategories([allCategory, ...data]);
            } catch (error) {
                console.error('Failed to load categories', error);
                // Fallback or empty state could be handled here
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="category-avatars-section"><p>Loading categories...</p></div>;

    return (
        <section className="category-avatars-section">
            <h2 className="section-title">Explore Categories</h2>
            <div className="avatars-container">
                {categories.map(cat => (
                    <div
                        key={cat._id || cat.id}
                        className={`avatar-item ${selectedCategory === (cat.id === 'all' ? '' : cat.name) ? 'active' : ''}`}
                        onClick={() => onSelectCategory(cat.id === 'all' ? '' : cat.name)}
                    >
                        <div className={`avatar-circle ${selectedCategory === (cat.id === 'all' ? '' : cat.name) ? 'selected-circle' : ''}`}>
                            {cat.id === 'all' ? (
                                <span className="avatar-all-text">All</span>
                            ) : (
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/80?text=Plant';
                                    }}
                                />
                            )}
                        </div>
                        <span className={`avatar-name ${selectedCategory === (cat.id === 'all' ? '' : cat.name) ? 'selected-text' : ''}`}>
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryAvatars;
