<template>
  <div>
    <h1>Liste des produits</h1>
    <!-- Recherche par nom -->
    <input type="text" v-model="searchName" placeholder="Rechercher par nom" />
    <!-- Recherche par catégorie -->
    <select v-model="searchCategory">
      <option value="">Toutes les catégories</option>
      <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
    </select>
    <productsAddProduct @product-added="getProducts()"/>
    <!-- Liste des produits -->
    <div class="product-list">
      <CardsProducts  v-for="product in filteredProducts" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { productService } from '@/api/services/productService';
import { categoryService } from '@/api/services/categoryService';
import { Product, Category } from '@/types/global';

// Recherche par nom
const searchName = ref('');
// Recherche par catégorie
const searchCategory = ref<number | string>();

// Filtrer les produits en fonction de la recherche
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // Filtrer par nom
    const nameMatch = product.name.toLowerCase().includes(searchName.value.toLowerCase());
    // Filtrer par catégorie
    const categoryMatch = searchCategory.value === '' || product.category_id === searchCategory.value;
    return nameMatch && categoryMatch;
  });
});

async function getProducts() {
  try {
    products.value = await productService.getAllProducts();
    console.log('products.value', products.value);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des produits : ', error);
  }
}

const products = ref<Product[]>([]);
onMounted(async () => {
  getProducts()
});

const categories = ref<Category[]>([]);
onMounted(async () => {
  try {
    categories.value = await categoryService.getAllCategories();
    console.log('categories.value', categories.value);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories : ', error);
  }
});
</script>

<style lang='scss' scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.product-card {
  background-color: $white-color;
  border: 1px solid $dark-color;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 20px);
}

.product-card h2 {
  margin-top: 0;
}

.product-card p {
  margin-bottom: 0;
}
</style>
