// src/services/api.js

/**
 * API service for handling all backend requests
 */

// Base API URL - change this if your API has a different base URL
const API_BASE_URL = 'http://localhost:8080';

/**
 * Generic fetch function with error handling
 */
const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
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
 * Generic POST request with error handling
 */
const postData = async (endpoint, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetchData(endpoint, options);
};

/**
 * Generic PUT request with error handling
 */
const putData = async (endpoint, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetchData(endpoint, options);
};

/**
 * Generic DELETE request with error handling
 */
const deleteData = async (endpoint) => {
  const options = {
    method: 'DELETE',
  };

  return fetchData(endpoint, options);
};

/**
 * Post-related API calls
 */
export const postService = {
  // Get featured post
  getFeaturedPost: () => fetchData('/api/posts/featured'),
  
  // Get recent posts
  getRecentPosts: (limit = 5) => fetchData(`/api/posts/recent?limit=${limit}`),
  
  // Get all posts with pagination
  getAllPosts: (page = 1, limit = 10) => 
    fetchData(`/api/posts?page=${page}&limit=${limit}`),
  
  // Get a single post by ID
  getPostById: (id) => fetchData(`/api/posts/${id}`),
  
  // Create a new post
  createPost: (postData) => postData('/api/posts', postData),
  
  // Update an existing post
  updatePost: (id, postData) => putData(`/api/posts/${id}`, postData),
  
  // Delete a post
  deletePost: (id) => deleteData(`/api/posts/${id}`),
  
  // Search posts
  searchPosts: (query, page = 1, limit = 10) => 
    fetchData(`/api/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`),
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
  getPostsByCategory: (slug, page = 1, limit = 10) => 
    fetchData(`/api/categories/${slug}/posts?page=${page}&limit=${limit}`),
  
  // Create a new category
  createCategory: (categoryData) => postData('/api/categories', categoryData),
  
  // Update a category
  updateCategory: (slug, categoryData) => putData(`/api/categories/${slug}`, categoryData),
  
  // Delete a category
  deleteCategory: (slug) => deleteData(`/api/categories/${slug}`),
};

/**
 * Tech stack related API calls
 */
export const techStackService = {
  // Get all tech stacks
  getAllTechStacks: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams ? `/api/tech-stacks?${queryParams}` : '/api/tech-stacks';
    return fetchData(endpoint);
  },
  
  // Get popular tech stacks
  getPopularTechStacks: (limit = 6) => 
    fetchData(`/api/tech-stacks/popular?limit=${limit}`),
  
  // Get trending tech stacks
  getTrendingTechStacks: (limit = 6) => 
    fetchData(`/api/tech-stacks/trending?limit=${limit}`),
  
  // Get tech stacks by category
  getTechStacksByCategory: (category, page = 1, limit = 10) => 
    fetchData(`/api/tech-stacks/category/${category}?page=${page}&limit=${limit}`),
  
  // Get a single tech stack by ID
  getTechStackById: (id) => fetchData(`/api/tech-stacks/${id}`),
  
  // Get a single tech stack by slug
  getTechStackBySlug: (slug) => fetchData(`/api/tech-stacks/slug/${slug}`),
  
  // Get posts by tech stack
  getPostsByTechStack: (id, page = 1, limit = 10) => 
    fetchData(`/api/tech-stacks/${id}/posts?page=${page}&limit=${limit}`),
  
  // Create a new tech stack (admin only)
  createTechStack: (techStackData) => postData('/api/tech-stacks', techStackData),
  
  // Update a tech stack (admin only)
  updateTechStack: (id, techStackData) => putData(`/api/tech-stacks/${id}`, techStackData),
  
  // Delete a tech stack (admin only)
  deleteTechStack: (id) => deleteData(`/api/tech-stacks/${id}`),
  
  // Search tech stacks
  searchTechStacks: (query) => 
    fetchData(`/api/tech-stacks/search?q=${encodeURIComponent(query)}`),
};

/**
 * Comments related API calls
 */
export const commentService = {
  // Get comments for a post
  getCommentsByPostId: (postId) => fetchData(`/api/posts/${postId}/comments`),
  
  // Create a new comment
  createComment: (postId, commentData) => postData(`/api/posts/${postId}/comments`, commentData),
  
  // Update a comment
  updateComment: (commentId, commentData) => putData(`/api/comments/${commentId}`, commentData),
  
  // Delete a comment
  deleteComment: (commentId) => deleteData(`/api/comments/${commentId}`),
  
  // Like a comment
  likeComment: (commentId) => postData(`/api/comments/${commentId}/like`, {}),
  
  // Reply to a comment
  replyToComment: (commentId, replyData) => postData(`/api/comments/${commentId}/replies`, replyData),
};