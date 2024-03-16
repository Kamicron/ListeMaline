<template>
  <div class="LM_Input">
    <p class="LM_Input__label" :class="store.isDark? 'dark-label' : 'white-label'" v-if="input?.label">{{ input.label }}</p>
    <input class="LM_Input__input" :value="input?.value" :placeholder="input?.placeholder" :type="input?.type" :class="store.isDark? 'dark-theme' : 'white-theme'"/>
    <p class="LM_Input__error" :class="store.isDark? 'dark-label' : 'white-label'" v-if="input?.error">{{ input.error }}</p>

  </div>
</template>

<script setup lang='ts'>
import { IInput } from '@/types/global';
import { store } from '@/store/index';

defineProps({
  input: {type: Object as PropType<IInput>}
})
  
</script>

<style lang='scss' scoped>
  .LM_Input{
    

    &__label {
      color: $dark-color;
      margin: 5px 10px;
    }

    .dark-label{
        color: $white-color;
    }
    .white-label{
      color: $dark-color;
    }

    &__input {
      width: 100%;
      height: calc(1.5em + 1.2rem + .0625rem);
      padding: .6rem .75rem;
      font-weight: 300;
      line-height: 1.5;
      color: #44476a;
      background-color: #e6e7ee;
      background-clip: padding-box;
      border: .0625rem solid #d1d9e6;
      transition: all .3s ease-in-out;
      font-size: 1rem;
      border-radius: .55rem;
      box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff;
    }
    
    &__error {
      color: #c43232 !important;
    }
  }

  .dark-theme {
    color: $white-color;
    background-color: $dark-color;
    border-color: $dark-color;
    box-shadow: inset 2px 2px 5px $dark-gray-color,inset -3px -3px 7px $medium-gray-color;
  }


</style>