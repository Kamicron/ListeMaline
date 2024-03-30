<template>
  <div class="cart-container">
    <h2>Panier</h2>
    <div v-for="cart in userCarts" :key="cart.cart_id">
      <CardsGeneral v-if="!cart.is_soft_reset" >
        <i class="fa-duotone fa-pen-to-square" @click="isEdditing = !isEdditing"></i>
        <p><strong>Nom du panier:</strong> {{ cart.cart_name }}</p>
        <p><strong>Date de création:</strong> {{ cart.date_created }}</p>
        <p><strong>Produits:</strong></p>
        <ul class="product-list">
          <CardsProducts  v-for="product in cart.products" :key="product.id" :product="product" @addProduct="addProduct($event, cart.cart_id)" @removeProduct="removeProduct($event, cart.cart_id)"/>
        </ul>
        <p><strong>Utilisateurs partageant le panier:</strong></p>
        <ul class="shared-users">
          <li v-for="user in cart.shared_users" :key="userId" class="shared-user">
            {{ user.name }}
          </li>
        </ul>
        <ProductsListOfProduct v-if="isEdditing" @addProduct="addProduct($event, cart.cart_id)"/>
      </CardsGeneral>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cartService } from '@/api/services/cartsService';
import { store } from '@/store/index';

const isEdditing = ref<boolean>(false)

// Déclaration d'une référence reactive pour stocker les paniers de l'utilisateur
const userCarts = ref([]);

// Fonction pour afficher les paniers de l'utilisateur connecté
async function displayUserCarts() {
  try {
    const carts = await cartService.getUserCarts(store.accessToken);
    console.log('test : ', carts);
    userCarts.value = carts; // Met à jour la référence reactive avec les paniers récupérés
  } catch (error) {
    console.error('Erreur lors de l\'affichage des paniers de l\'utilisateur : ', error);
  }
}

// Appel de la fonction pour afficher les paniers de l'utilisateur connecté
displayUserCarts();

async function addProduct(productId: number, cartId: number) {
  try {
    await cartService.addProductToCart(productId, cartId, store.accessToken);
    // Mettre à jour les paniers après l'ajout du produit
    await displayUserCarts();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au panier : ', error);
  }
}

async function removeProduct(productId: number, cartId: number) {
  try {
    await cartService.removeProductFromCart(productId, cartId, store.accessToken);
    // Mettre à jour les paniers après l'ajout du produit
    await displayUserCarts();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au panier : ', error);
  }
}
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
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 10px;
  flex-wrap: wrap; 
}

.product-list > * {
  flex-basis: calc(20% - 20px); /* Définit la largeur de chaque élément sur 20% moins l'espace entre les éléments */
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
