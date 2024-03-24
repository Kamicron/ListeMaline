<template>
  <div v-if="product" class="product-cards" :class="store.isDark? 'dark-theme' : 'white-theme'">
    <div class="product-cards__category">
      <i class="product-cards__category--icon" :class="product.category.icon"></i>
      <p class="product-cards__category--text">{{ product.category.name }}</p>
    </div>
    <div class="product-cards__product">
      <h2 class="product-cards__product--title">{{ product.name }}</h2>
      <p class="product-cards__product--text">{{ product.description }}</p>
      <p class="product-cards__product--text">{{ product.price }} €</p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { store } from '@/store/index';
import { IProduct } from '@/types/products';
import { PropType } from 'vue';

const props = defineProps ({
  product: {type: Object as PropType<IProduct>, required: true}
})

console.log('props.product', props.product);


</script>

<style lang='scss' scoped>
.product-cards {
  padding: 20px;
  font-family: "Nunito Sans",sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  color: $dark-color;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: .0625rem solid $gray-neu;
  border-radius: .55rem;
  background-color: $white-color;
  border-color: $gray-neu;
  transition: all .2s ease;
  box-shadow: 6px 6px 12px $dark-neu,-6px -6px 12px $light-neu;
  position: relative;
  width: 300px;
  
  &__category {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    gap: 10px
  }

  &__product {
    &--title {
      font-weight: 600;
      font-size: 16px;
    }
  }
}

.dark-theme {
    color: $white-color;
    background-color: $dark-color;
    border-color: $dark-color;
    box-shadow: 6px 6px 12px $dark-gray-color,-6px -6px 12px $medium-gray-color;
  }
</style>