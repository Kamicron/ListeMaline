<template>
  <div class="input_logo">
    <div class="input_logo__container" :class="[
        store.isDark ? 'container_dark-theme' : 'white-theme',
        properties?.icon?.position === IconPosition.RIGHT
          ? 'right-icon'
          : 'left-icon',
      ]"
    >
      <div
        class="input_logo__container--icon"
        :class="[
          store.isDark ? 'dark-theme' : 'white-theme',
          properties?.icon?.position === IconPosition.RIGHT
            ? 'no-border-left'
            : 'no-border-right',
        ]"
      >
        <i v-if="properties?.icon" :class="properties.icon?.iconCode" :style="`font-size: ${properties.icon.size}px;`"></i>
      </div>
      <InputLMInputBase :class="properties?.icon?.position === IconPosition.RIGHT
            ? 'no-border-left'
            : 'no-border-right'" v-model="vModel" :properties="properties" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPosition } from "@/assets/enum/global";
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
//   emit("update:modelValue", event.target.value);
// };
</script>

<style lang="scss" scoped>
.input_logo {
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
    box-shadow: inset 2px 2px 5px $dark-neu, inset -3px -3px 7px $light-neu;
    border-radius: 0.55rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &--icon {
      padding: 10px;
      color: $dark-color;
      background-color: $white-color;
      border: 0.0625rem solid $gray-neu;
      border-radius: 0.55rem;
      transition: all 0.3s ease-in-out;
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
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .no-border-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &__error {
    color: #c43232 !important;
    margin: 5px 10px;
  }
}

.dark-theme {
    color: $white-color;
    background-color: $dark-color;
    border: 0.0625rem solid $dark-color;;
}


.container_dark-theme {
  box-shadow: 
  inset 2px 2px 5px $dark-gray-color, 
  inset -3px -3px 7px $medium-gray-color;
}

.input_logo .no-border-left::v-deep .input_base__input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input_logo .no-border-right::v-deep .input_base__input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
