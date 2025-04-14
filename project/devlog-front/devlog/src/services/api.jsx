// src/services/api.js

/**
 * API service for handling all backend requests
 */

// Base API URL - change this if your API has a different base URL
const API_BASE_URL = 'http://localhost:8080';

/**
 * Generic fetch function with error handling
 */
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Post-related API calls
 */
export const postService = {
  // Get featured post
  getFeaturedPost: () => fetchData('/api/posts/featured'),
  
  // Get recent posts
  getRecentPosts: () => fetchData('/api/posts/recent'),
  
  // Get a single post by ID
  getPostById: (id) => fetchData(`/api/posts/${id}`),
  
  // Get all posts (with optional params)
};

/**
 * Category-related API calls
 */
export const categoryService = {
  // Get all categories
  getAllCategories: () => fetchData('/api/categories'),
  
  // Get a single category by slug
  getCategoryBySlug: (slug) => fetchData(`/api/categories/${slug}`),
  
  // Get posts by category
  getPostsByCategory: (slug, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return fetchData(`/api/categories/${slug}/posts?${queryParams}`);
  },
};

/**
 * Tech stack related API calls
 */
export const techStackService = {
  // Get all tech stacks
  getAllTechStacks: () => fetchData('/api/tech-stacks'),
  
  // Get a single tech stack by ID
  getTechStackById: (id) => fetchData(`/api/tech-stacks/${id}`),
  
  // Get posts by tech stack
  getPostsByTechStack: (id, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return fetchData(`/api/tech-stack/${id}/posts?${queryParams}`);
  },
};