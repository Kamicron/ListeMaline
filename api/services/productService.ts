// services/productService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

export const productService = {
  async getAllProducts() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits : ', error);
      throw error;
    }
  },

  async getProductsByCategory(categoryId: number) {
    try {
      const response = await axios.get(`${API_URL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits par catégorie : ', error);
      throw error;
    }
  },

  async getProductById(productId: number) {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du produit par ID : ', error);
      throw error;
    }
  },

  async searchProductsByName(name: string) {
    try {
      const response = await axios.get(`${API_URL}/search/${name}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche des produits par nom : ', error);
      throw error;
    }
  },
  
  async createProduct(productData: { name: string; price: number; description: string; category_id: number; user_id: number, accessToken: string }) {
    try {
      const response = await axios.post(`${API_URL}/add_product`, productData, {
        headers: {
          'Authorization': `Bearer ${productData.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du produit : ', error);
      throw error;
    }
  },
};
