<template>
  <div class="wrapper">
    <ButtonMainButton :button="buttonTest"/>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { IButton } from '../../types/global';
import { Theme } from '../../assets/enum/global';


const buttonTest = ref<IButton>({display:'Coucou', color:Theme.DARK})
    
</script>

<style lang='scss' scoped>
    .wrapper {
      margin: 50px;

    }
</style>