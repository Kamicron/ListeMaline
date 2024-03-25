<template>
  <div class="cart-container">
    <h2>Panier</h2>
    <div v-for="cart in userCarts" :key="cart.cart_id" class="cart">
      <div v-if="!cart.is_soft_reset" class="cart-info">
        <p><strong>Nom du panier:</strong> {{ cart.cart_name }}</p>
        <p><strong>Date de création:</strong> {{ cart.date_created }}</p>
        <p><strong>Produits:</strong></p>
        <ul class="product-list">
          <li v-for="product in cart.products" :key="product.id" class="product-item">
            <span>{{ product.name }}</span> - Quantité: {{ product.quantity }}
          </li>
        </ul>
        <p><strong>Utilisateurs partageant le panier:</strong></p>
        <ul class="shared-users">
          <li v-for="userId in cart.shared_user_ids" :key="userId" class="shared-user">
            ID Utilisateur: {{ userId }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cartService } from '@/api/services/cartsService';
import { store } from '@/store/index';

// Déclaration d'une référence reactive pour stocker les paniers de l'utilisateur
const userCarts = ref([]);

// Fonction pour afficher les paniers de l'utilisateur connecté
async function displayUserCarts() {
  try {
    const carts = await cartService.getUserCarts(store.accessToken);
    console.log('Paniers de l\'utilisateur : ', carts);
    userCarts.value = carts; // Met à jour la référence reactive avec les paniers récupérés
  } catch (error) {
    console.error('Erreur lors de l\'affichage des paniers de l\'utilisateur : ', error);
  }
}

// Appel de la fonction pour afficher les paniers de l'utilisateur connecté
displayUserCarts();
</script>

<style scoped>
.cart-container {
  margin-top: 20px;
}

.cart {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.cart-info {
  margin-bottom: 10px;
}

.product-list {
  list-style: none;
  padding-left: 0;
}

.product-item {
  margin-bottom: 5px;
}

.shared-users {
  list-style: none;
  padding-left: 0;
}

.shared-user {
  margin-bottom: 5px;
}
</style>
