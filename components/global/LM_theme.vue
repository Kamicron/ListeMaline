<template>
  <div class="wrapper">
    <ButtonMainButton :button="buttonTheme"  @click="toggleDarkMode"/>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { IButton } from '../../types/global';
import { Theme } from '../../assets/enum/global';
import { store } from '../../store/index'


const buttonTheme = ref<IButton>({display:'White theme', color:Theme.WHITE})
    
const toggleDarkMode = () => {
  store.isDark = !store.isDark;
  if(store.isDark ) {
    buttonTheme.value.display = 'White theme'
    buttonTheme.value.color = Theme.WHITE
  } else {
    buttonTheme.value.display='Dark theme'
    buttonTheme.value.color = Theme.DARK
  }
};
</script>

<style lang='scss' scoped>
    .wrapper {
      margin: 50px;

    }
</style>