// services/cartService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/carts';

export const cartService = {
  async getUserCarts(accessToken: string): Promise<User> {
    try {
      const response = await fetch(API_URL+'/me', {
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

  async addProductToCart(productId: number, cartId: number, accessToken: string): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/add-product`, {
        productId,
        cartId
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Erreur lors de l\'ajout du produit au panier');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit au panier : ', error);
      throw error;
    }
  },
};

