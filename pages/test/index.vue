<template>
  <div class="wrapper">
    <ButtonMainButton :button="buttonTest"/>
    <InputLMInput :input="inputTest" />
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { IButton, IInput } from '../../types/global';
import { Theme, TypeInput } from '../../assets/enum/global';


const buttonTest = ref<IButton>({display:'Coucou', color:Theme.DARK})
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