<template>
  <div class="input_base">
    <select v-model="selectedOption" class="input_base__input" @change="handleSelectChange">
      <option v-for="option in selectOptions" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/store/index';
import { defineProps, defineEmits, PropType } from 'vue';
import { IInput, IOption } from '@/types/global';

const props = defineProps({
  modelValue: { type: Object as PropType<IOption>, required: true },
  properties: { type: Object as PropType<IInput> },
  selectOptions: { type: Array as PropType<{ value: string, label: string }[]>, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);

const selectedOption = ref<IOption>(props.modelValue);

const handleSelectChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectedOption.value = target.value;
  console.log('selectedOption', selectedOption);
  
  emit('update:modelValue', selectedOption.value);
};

watch(
  () => selectedOption.value,
  (newVam) => {
    console.log('newVam:', newVam);
  }
);
</script>

<style lang='scss' scoped>
.input_base {
  width: 100%;

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
    box-shadow: inset 2px 2px 5px $dark-neu, inset -3px -3px 7px $light-neu;
  }
}

.dark-theme {
  color: $white-color;
  background-color: $dark-color;
  border-color: $dark-color;
  box-shadow: inset 2px 2px 5px $dark-gray-color, inset -3px -3px 7px $medium-gray-color;
}
</style>
