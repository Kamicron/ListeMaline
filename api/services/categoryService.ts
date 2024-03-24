// api/services/categoryService.ts
import axios from 'axios';
import { Category } from '../../types/global';

const API_URL = 'http://localhost:3001/api/categories';

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(API_URL);
      console.log('response', response);
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories : ', error);
      throw error;
    }
  },

  async searchCategoryByName(name: string): Promise<Category[]> {
    try {
      const response = await axios.get(`${API_URL}/search?name=${name}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de la catégorie : ', error);
      throw error;
    }
  },
};
