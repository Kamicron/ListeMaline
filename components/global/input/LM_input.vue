<template>
  <div class="LM_input">
    <p class="LM_Input__label" :class="store.isDark ? 'white-label' : 'dark-label'" v-if="properties?.label">
      {{ properties.label }}
    </p>

    <InputLMInput__logo v-if="properties?.icon" v-model="vModel" :properties="properties" />
    <InputLMInput_base v-else v-model="vModel" :properties="properties" />
    <p class="LM_Input__error nunito-important" v-if="properties?.error">
      {{ properties.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { store } from "@/store/index";
import { IInput } from "@/types/global";

const props = defineProps({
  modelValue: { type: String, required: true },
  properties: { type: Object as PropType<IInput> },
});

const emit = defineEmits(["update:modelValue"]);

const vModel = ref<string>(props.modelValue);

watch(
  () => vModel.value,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);

// const handleInput = (event: any) => {
//   emit('update:modelValue', event.target.value)
// }
</script>

<style lang="scss" scoped>
.LM_Input {
  &__label {
    // color: $dark-color;
    margin: 5px 10px;

    
  }


  &__input {
    width: 100%;
    height: calc(1.5em + 1.2rem + 0.0625rem);
    padding: 0.6rem 0.75rem;
    font-weight: 300;
    line-height: 1.5;
    color: $dark-color;
    background-color: $white-color;
    background-clip: padding-box;
    border: 0.0625rem solid $gray-neu;
    transition: all 0.3s ease-in-out;
    font-size: 1rem;
    border-radius: 0.55rem;
    box-shadow: inset 2px 2px 5px $dark-neu, inset -3px -3px 7px $light-neu;
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

.dark-label {
    color: $dark-color ;
  }
  .white-label {
    color: $white-color ;
  }

</style>
