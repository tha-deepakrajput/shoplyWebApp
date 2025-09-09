'use client';

import { useState, useEffect } from 'react';
import { getAllCategories } from '@/lib/api';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-4 py-1 rounded-full ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-1 rounded-full capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}