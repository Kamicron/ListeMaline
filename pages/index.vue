<template>
  <div>

  </div>
</template>

<script setup lang='ts'>
import { productService } from '@/api/services/productService';
import { categoryService } from '@/api/services/categoryService';
import { Product, Category, IButton } from '@/types/global';

const buttonTest = ref<IButton>({display:'Coucou'})

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

// Récupérer les produits depuis l'API RESTful
const products = ref<Product[]>([]);
onMounted(async () => {
  try {
    products.value = await productService.getAllProducts();
  } catch (error) {
    console.error('Erreur lors de la récupération des produits : ', error);
  }
});

// Récupérer les catégories depuis l'API RESTful
const categories = ref<Category[]>([]);
onMounted(async () => {
  try {
    categories.value = await categoryService.getAllCategories();
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
