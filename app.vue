<template>
  <div class="layout" :class="{ 'dark-theme': store.isDark, 'white-theme': !store.isDark }">
    <LMTheme />
    <LMHeader/>
    <NuxtPage/>
    From A: {{ store.isDark }}  </div>
</template>

<script setup lang="ts">
import { store } from './store/index'

import { watchEffect } from 'vue';
watchEffect(() => {
  document.body.classList.toggle('dark-theme', store.isDark);
  document.body.classList.toggle('white-theme', !store.isDark);
});
</script>

<style>
 @import "./assets/scss/_css-reset.scss";
 @import "./assets/scss/global.scss";
 .layout {
  max-width: 1400px;
  margin: auto;
 }

.white-theme {
  background-color: #dfe2f1;
}

.dark-theme {
  background-color: #403a50;
}
</style>
