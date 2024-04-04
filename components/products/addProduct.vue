<template>
  <div>
    <Alert ref="alertRef" />

    <h2>Ajouter un produit</h2>
    <div @submit.prevent="addProduct" class="add_product">
      <div class="add_product__container">
        <InputLMInput class="add_product__container--item" v-model="formData.name" :properties="inputName" />
        <InputLMInput class="add_product__container--item" v-model="formData.price" :properties="inputPrice" />
        <InputLMInput class="add_product__container--item" v-model="searchCategory" :properties="inputSelect" />
        <!-- <select class="add_product__container--item" v-model="searchCategory">
          <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>        -->
      </div>
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description" required></textarea>
      <ButtonMainButton :button="buttonAdd" @click="addProduct()" />
      <!-- <InputLMInputSelect
      v-model="selectedOption"
      :selectOptions="options"
      :properties="{ placeholder: 'Sélectionnez une option' }"
    /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { productService } from '@/api/services/productService';
import { store } from '@/store/index';
import { Category, IButton, IInput } from '@/types/global';
import { categoryService } from '@/api/services/categoryService';
import { IconPosition, MessageValidation, Theme, TypeInput } from '@/assets/enum/global';

const alertRef = ref<any>(null);
const categories = ref<Category[]>([]);
const emit = defineEmits(['product-added'])

const options = ref([
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]);

// Initialisez la valeur sélectionnée
const selectedOption = ref('');

const categoryOptions = computed<IOption<Category>[]>(() => {
  if (!categories.value) return [];

  // Transformez les objets Category en objets IOption
  return categories.value.map(category => ({
    value: {
      id: category.id,
      name: category.name,
      icon: category.icon // Assurez-vous que l'objet Category a une propriété icon
    },
    label: category.name
  }));
});

console.log('categoryOptions', categoryOptions);


const formData = reactive({
  name: '',
  price: 0,
  description: '',
  category_id: 0,
  user_id: 0,
  accessToken: store.accessToken
});


const inputName = ref<IInput>({
  placeholder: "Carotte",
  type: TypeInput.TEXT,
  color: Theme.DARK,
  label: 'Nom',
  error: {
    display: "",
    enable: true
  }
})

const inputPrice = ref<IInput>({
  placeholder: "5.4",
  type: TypeInput.NUMBER,
  color: Theme.DARK,
  label: 'Prix',
  error: {
    display: "",
    enable: true
  }
})

const inputSelect = ref<IInput>({
  placeholder: "Choisissez l'option",
  type: TypeInput.SELECT,
  color: Theme.DARK,
  label: 'Catégorie',
  error: {
    display: "",
    enable: true
  },
  option: categoryOptions
})

const buttonAdd = ref<IButton>({
  display: 'Ajouter produit',
  icon: {
    position: IconPosition.RIGHT,
    iconCode: "fa-duotone fa-album-circle-plus",
    size: 30,
  }
})

const searchCategory = ref();

const showMessageAlert = (status: MessageValidation, message: string) => {
  if (alertRef.value) {
    alertRef.value.addMessage(status, message);
  } else {
    console.error("La référence d'alerte n'est pas définie.");
  }
}

async function addProduct() {
  try {

    console.log('store.accessToken', store.accessToken);
    console.log('!store.user?.id ', !store.user?.id );
    console.log('searchCategory.value', searchCategory.value);
    
    if(!store.accessToken || !store.user?.id || !searchCategory.value) return
    console.log('searchCategory.value', searchCategory);
    
    formData.accessToken = store.accessToken
    console.log('searchCategory.value.id', searchCategory.value.value.id);
    
    formData.category_id = searchCategory.value.value.id
    formData.user_id = store.user?.id
    
    await productService.createProduct(formData);
    showMessageAlert(MessageValidation.SUCCESS, `Ajout du produit réussis`);
    emit('product-added')
  } catch (error) {
    showMessageAlert(MessageValidation.ERROR, `'Erreur lors de l\'ajout du produit : ', ${error}`);
  }
}

onMounted(async () => {
  try {
    categories.value = await categoryService.getAllCategories();
    console.log('categories.value', categories.value);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories : ', error);
  }
});

watch(
  () => searchCategory.value,
  (newCat) => {
    console.log('newCat:', newCat);
  }
);
</script>

<style lang="scss" scoped>
.add_product {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__container {
    display: flex;
    gap: 10px;
    &--item {
      width: 100%;
    }
  }
}
</style>