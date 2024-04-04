<template>
  <div class="input_base">
    <select v-model="selectedOption.value" class="input_base__input" @change="handleSelectChange">
      <option v-for="option in selectOptions" :key="option.value.id" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { IInput, IOption } from '@/types/global';

interface Props {
  modelValue?: IOption<any>; // Le "?" signifie que modelValue est facultatif
  properties: IInput<any>;
  selectOptions: { value: any; label: string }[];
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const selectedOption = ref<IOption<any>>(props.modelValue || { value: null, label: '' }); // Utilisation d'une valeur par défaut si props.modelValue est undefined

const handleSelectChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedIndex = target.selectedIndex;
  const selectedOptionItem = props.selectOptions[selectedIndex];
  
  if (selectedOptionItem) {
    selectedOption.value = selectedOptionItem;
    emit('update:modelValue', selectedOptionItem);
  }
};

watch(selectedOption, (newVal) => {
  emit('update:modelValue', newVal);
});
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
