<template>
  <div class="layout">
    <LMTheme />
    <!-- <LMHeader/> -->
    <NuxtPage/>
    From A: {{ store.isDark }}  </div>
</template>

<script setup lang="ts">
import { store } from './store/index'
import { watchEffect } from 'vue';
import { onMounted } from 'vue';

useHead(() => ({
  link: [
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css' },
    { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css' }
  ]
}))

onMounted(() => {
  document.body.classList.toggle('dark-theme', store.isDark);
  document.body.classList.toggle('white-theme', !store.isDark);
});

if (typeof document !== 'undefined') {
    watchEffect(() => {
      document.body.classList.toggle('dark-theme', store.isDark);
      document.body.classList.toggle('white-theme', !store.isDark);
    });
}
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
  transition: all .2s ease;
}

.dark-theme {
  background-color: #403a50;
  transition: all .2s ease;
}
</style>
