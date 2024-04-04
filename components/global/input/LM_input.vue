<template>
  <div class="LM_input">
    <p class="LM_Input__label" :class="store.isDark ? 'white-label' : 'dark-label'" v-if="properties?.label">
      {{ properties.label }}
    </p>

    <InputLMInput__logo v-if="properties?.icon" v-model="vModel" :properties="properties" />
    <InputLMInputSelect 
      v-else-if="properties?.type === TypeInput.SELECT" 
      v-model="test"       
      :selectOptions="properties?.option"
      :properties="{ placeholder: `${properties.placeholder}` }"
    />
    <InputLMInput_base v-else v-model="vModel" :properties="properties" />
    <p class="LM_Input__error nunito-important" :class="properties.error.enable && properties.error.display === '' ? 'LM_Input__error--margin' : ''" v-if="properties?.error">
      {{ properties.error.display }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { TypeInput } from "@/assets/enum/global";
import { store } from "@/store/index";
import { IInput, IOption } from "@/types/global";
import { PropType } from "vue";

const props = defineProps({
  modelValue: { type: [String, Object] as PropType<string | IOption<any>>, required: true },
  properties: { type: Object as PropType<IInput> },
});


const emit = defineEmits(["update:modelValue"]);

const vModel = ref<string | IOption<any>>(props.modelValue);

watch(
  () => vModel.value,
  (newVal, oldVal) => {
    if (props.properties?.error && props.properties.error.display && newVal !== oldVal) {
      props.properties.error.display = "";
    }
    console.log('newVal input', newVal);
    
    emit("update:modelValue", newVal);
  }
);

const test= ref()

watch(
  () => test.value,
  (test) => {
    console.log('test:', test.label);
    if(!test.label) return
    emit("update:modelValue", test);
    console.log('emit');
    
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

    &--margin {
      margin-bottom: 26px;
    }
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
