<template>
  <div class="LM_Input">
    <p
      class="LM_Input__label"
      :class="store.isDark ? 'dark-label' : 'white-label'"
      v-if="properties?.label"
    >
      {{ properties.label }}
    </p>
    <div class="LM_Input__container" 
      :class="[
          store.isDark ? 'dark-theme' : 'white-theme',
          properties?.icon?.position === IconPosition.RIGHT ? 'right-icon' : 'left-icon'
        ]">
      <div 
        class="LM_Input__container--icon"
        :class="[
            store.isDark ? 'dark-theme' : 'white-theme',
            properties?.icon?.position === IconPosition.RIGHT ? 'no-border-left' : 'no-border-right'
          ]">
        <i v-if="properties?.icon" :class="properties.icon?.iconCode" :style="`font-size: ${properties.icon.size}px;`"></i>
      </div>
      <input
        :placeholder="properties?.placeholder"
        :value="modelValue"
        class="LM_Input__container--input"
        :class="[store.isDark ? 'dark-theme' : 'white-theme', properties?.icon?.position === IconPosition.RIGHT ? 'no-border-right' : 'no-border-left']"
        :type="properties?.type"
        @input="handleInput"
      />
    </div>
    <p
      class="LM_Input__error nunito-important"
      :class="store.isDark ? 'dark-label' : 'white-label'"
      v-if="properties?.error"
    >
      {{ properties.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { IconPosition } from "@/assets/enum/global";
import { store } from "@/store/index";
import { IInput } from "@/types/global";

const props = defineProps({
  modelValue: { type: String, required: true },
  properties: { type: Object as PropType<IInput> },

  // properties: {
  //   label: { type: String, required: true },
  //   placeholder: { type: String, default: '' },
  //   error: { type: String, default: '' },
  // }
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.LM_Input {
  &__label {
    color: $dark-color;
    margin: 5px 10px;
    
  }

  .dark-label {
    color: $white-color;
  }
  .white-label {
    color: $dark-color;
  }

  &__container {
    box-shadow: inset 2px 2px 5px $dark-neu,inset -3px -3px 7px $light-neu;
    border-radius: 0.55rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &--icon {
      padding: 10px;
      color: $dark-color;
      background-color: $white-color;
      border: .0625rem solid $gray-neu;
      border-radius: .55rem;
      transition: all .3s ease-in-out;
    }

    &--input {
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
  }

  .right-icon {
    flex-direction: row-reverse;
  }

  .left-icon {
    flex-direction: row;
  }

  .no-border-right {
    border-top-right-radius: 0; border-bottom-right-radius: 0;
  }

  .no-border-left {
    border-top-left-radius: 0; border-bottom-left-radius: 0;
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
