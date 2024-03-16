<template>
  <div class="wrapper">
    <ButtonMainButton :button="buttonTheme"  @click="toggleDarkMode"/>
  </div>
</template>

<script setup lang='ts'>
import { IButton } from '@/types/global';
import { store } from '@/store/index'

const buttonTheme = ref<IButton>({display: 'White theme'});

    
const toggleDarkMode = () => {
  store.isDark = !store.isDark;
  buttonTheme.value.display = store.isDark ? 'White theme' : 'Dark theme';
};
</script>

<style lang='scss' scoped>
</style>
