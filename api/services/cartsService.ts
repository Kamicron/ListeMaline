// services/cartService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/carts';

export const cartService = {
  async getUserCarts(accessToken: string): Promise<User> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails de l\'utilisateur');
      }

      const responseData = await response.json(); // Convertir la réponse en format JSON
      return responseData; // Retourner les données JSON récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des paniers de l\'utilisateur : ', error);
      throw error;
    }
  },
};

