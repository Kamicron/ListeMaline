<template>
  <div class="wrapper">
    <!-- <ButtonMainButton :button="buttonUp"/>
    <ButtonMainButton :button="buttonDown"/>
    <ButtonMainButton :button="buttonLeft"/>
    <ButtonMainButton :button="buttonRight"/> -->
    <InputLMInput v-model="inputTest1" :properties="propsTest1" />
    <InputLMInput v-model="inputTest1" :properties="propsTest2" />
    <p>inputTest : {{ inputValue }}</p>
      </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { IButton, IInput } from '@/types/global';
import { IconPosition, Theme, TypeInput } from '@/assets/enum/global';

const sizeIcon = 20

const buttonLeft = ref<IButton>({
  display:'Left', 
  icon: {
    position: IconPosition.LEFT, 
    iconCode: "fa-duotone fa-house", 
    size:sizeIcon, 
  }
})

const buttonRight = ref<IButton>({
  display:'Right', 
  icon: {
    position: IconPosition.RIGHT, 
    iconCode: "fa-duotone fa-house", 
    size:sizeIcon, 
  }
})

const buttonUp = ref<IButton>({
  display:'Up', 
  icon: {
    position: IconPosition.UP, 
    iconCode: "fa-duotone fa-house", 
    size:sizeIcon, 
  }
})

const buttonDown = ref<IButton>({
  display:'down', 
  icon: {
    position: IconPosition.DOWN, 
    iconCode: "fa-duotone fa-house", 
    size:sizeIcon, 
  }
})

const propsTest1 = ref<IInput>({
  placeholder:"test", 
  type:TypeInput.TEXT, 
  color:Theme.DARK,
  label: 'Prénom',
  error: "Ceci est un message d'erreur",
})

const propsTest2 = ref<IInput>({
  placeholder:"test", 
  type:TypeInput.TEXT, 
  color:Theme.DARK,
  label: 'Prénom',
  error: "Ceci est un message d'erreur",
  icon: {
    size: 18,
    position: IconPosition.LEFT, 
    iconCode: "fa-duotone fa-house", 

  }
})

const inputTest1 = ref("coucou")

const inputValue = computed({
  get: () => inputTest1.value,
  set: (value) => { inputTest1.value = value }
})
  
</script>

<style lang='scss' scoped>
    .wrapper {
      margin: 50px;
      display: flex;
      flex-direction: column;
      gap: 20px;

    }
</style>