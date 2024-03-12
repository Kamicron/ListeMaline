<template>
  <div class="layout" :class="isDarkMode">
    <LMHeader/>
    <NuxtPage/>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

const isDarkMode = ref(localStorage.getItem('isDarkMode') || undefined)
watch(isDarkMode, newValue => {
    if (!newValue) localStorage.removeItem('isDarkMode')
    else localStorage.setItem('isDarkMode', newValue)
})
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
