<template>
  <div class="input_base"
  >
    <input 
      :placeholder="properties?.placeholder" 
      :value="modelValue" 
      class="input_base__input"
      :class="store.isDark? 'dark-theme' : 'white-theme'"
      :type="properties?.type" 
      @input="handleInput">

  </div>
</template>

<script setup lang="ts">
import { store } from '@/store/index';
import { IInput } from '@/types/global';

const props = defineProps({
  modelValue: { type: String, required: true },
  properties: {type: Object as PropType<IInput>},

  // properties: {
  //   label: { type: String, required: true },
  //   placeholder: { type: String, default: '' },
  //   error: { type: String, default: '' },
  // }
});

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang='scss' scoped>
  .input_base{
    width: 100%;

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
      color: $dark-color;
      background-color: $white-color;
      background-clip: padding-box;
      border: .0625rem solid $gray-neu;
      transition: all .3s ease-in-out;
      font-size: 1rem;
      border-radius: .55rem;
      box-shadow: inset 2px 2px 5px $dark-neu,inset -3px -3px 7px $light-neu;
    }
    
    &__error {
      color: #c43232 !important;
      margin: 5px 10px;
    }
  }

  .dark-theme {
    color: $white-color;
    background-color: $dark-color;
    border-color: $dark-color;
    box-shadow: inset 2px 2px 5px $dark-gray-color,
    inset -3px -3px 7px $medium-gray-color;
  }


</style>