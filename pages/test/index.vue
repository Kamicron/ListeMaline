<template>
  <div class="wrapper">
    <ButtonMainButton :button="buttonUp"/>
    <ButtonMainButton :button="buttonDown"/>
    <ButtonMainButton :button="buttonLeft"/>
    <ButtonMainButton :button="buttonRight"/>
    <InputLMInput :input="inputTest" />
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

const inputTest = ref<IInput>({
  value:"", 
  placeholder:"test", 
  type:TypeInput.TEXT, 
  color:Theme.DARK,
  label: 'Prénom',
  error: "Ceci est un message d'erreur"
})
  
</script>

<style lang='scss' scoped>
    .wrapper {
      margin: 50px;

    }
</style>