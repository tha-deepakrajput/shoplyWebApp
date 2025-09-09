import { Product } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Fetch all categories
export const getAllCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch products in a specific category
export const getProductsInCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products in category');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};