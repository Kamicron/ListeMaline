<template>
  <div class="cart-container">
    <Alert ref="alertRef" />
    <h2>Ajout d'un panier</h2>
    <InputLMInput  v-model="cartName" :properties="inputCartName" />
    <ButtonMainButton :button="buttonCreate" @click="create_cart()"/>

    <h2>Panier</h2>
    <div v-for="cart in userCarts" :key="cart.cart_id">
      <CardsGeneral v-if="!cart.is_soft_reset">
        <i class="fa-duotone fa-pen-to-square" @click="isEdditing = !isEdditing"></i>
        <i class="fa-duotone fa-trash-xmark" @click="soft_reset(cart.cart_id)"></i>
        <p><strong>Nom du panier:</strong> {{ cart.cart_name }}</p>
        <p><strong>Date de création:</strong> {{ cart.date_created }}</p>
        <p><strong>Produits:</strong></p>
        <ul class="product-list">
          <CardsProducts v-for="product in cart.products" :key="product.id" :product="product"
            @addProduct="addProduct($event, cart.cart_id)" @removeProduct="removeProduct($event, cart.cart_id)" />
        </ul>
        <p><strong>Utilisateurs partageant le panier:</strong></p>
        <ul class="shared-users">
          <li v-for="user in cart.shared_users" :key="user.id" class="shared-user">
            {{ user.name }}
          </li>
        </ul>
        <ProductsListOfProduct v-if="isEdditing" @addProduct="addProduct($event, cart.cart_id)" />
      </CardsGeneral>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartService } from '@/api/services/cartsService';
import { store } from '@/store/index';
import { MessageValidation, Theme, TypeInput } from '@/assets/enum/global';
import { IButton, IInput } from '@/types/global';
import { ICart } from '@/types/cart';

const alertRef = ref<any>(null);

const isEdditing = ref<boolean>(false)
const cartName = ref<string>("")
  const inputCartName = ref<IInput>({
  placeholder:"Nouveau panier", 
  type:TypeInput.TEXT, 
  color:Theme.DARK,
  label: 'Email',
  // error: "Ceci est un message d'erreur"
})

const showMessageAlert = (status: MessageValidation, message: string) => {
  if (alertRef.value) {
    alertRef.value.addMessage(status, message);
  } else {
    console.error("La référence d'alerte n'est pas définie.");
  }
}

const buttonCreate = ref<IButton>({display:"S'inscrire"})


// Déclaration d'une référence reactive pour stocker les paniers de l'utilisateur
const userCarts = ref<ICart[]>([]);
console.log('userCarts', userCarts);


// Fonction pour afficher les paniers de l'utilisateur connecté
async function displayUserCarts() {
  try {
    if(!store.accessToken) return 
    const carts = await cartService.getUserCarts(store.accessToken);
    console.log('test : ', carts);
    userCarts.value = carts;

  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors de l\'affichage des paniers de l\'utilisateur : ', ${error}`);
  }
}

// Appel de la fonction pour afficher les paniers de l'utilisateur connecté
displayUserCarts();

async function addProduct(productId: number, cartId: number) {
  try {
    if(!store.accessToken) return
    await cartService.addProductToCart(productId, cartId, store.accessToken);
    showMessageAlert(MessageValidation.SUCCESS, 'Produit ajouté au panier avec succes');
    await displayUserCarts();
  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors de l\'ajout du produit au panier : ', ${error}`);
  }
}

async function removeProduct(productId: number, cartId: number) {
  try {
    if(!store.accessToken) return
    await cartService.removeProductFromCart(productId, cartId, store.accessToken);
    showMessageAlert(MessageValidation.SUCCESS, 'Produit retiré au panier avec succes');
    await displayUserCarts();
  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors du retrait du produit au panier : ', ${error}`);
  }
}

async function create_cart() {
  try {
    if(!store.accessToken) return
    await cartService.createCart(cartName.value, store.accessToken)
    showMessageAlert(MessageValidation.SUCCESS, 'Creation du panier réussis');
    await displayUserCarts();
  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors de la création du panier : ', ${error}`);
  }
}

async function soft_reset(id: number) {
  try {
    if(!store.accessToken) return
    await cartService.softResetCart(id, store.accessToken)
    showMessageAlert(MessageValidation.SUCCESS, 'Suppression du panier réussis');
    await displayUserCarts();
  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors de la suppression du panier : ', ${error}`);
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

.product-list>* {
  flex-basis: calc(20% - 20px);
  /* Définit la largeur de chaque élément sur 20% moins l'espace entre les éléments */
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
