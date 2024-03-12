<template>
    <ButtonMainButton :button="buttonTheme" @click="toggleTheme"/>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { IButton } from '../../types/global';
import { Theme } from '../../assets/enum/global';

const isDarkMode = ref(false);

const buttonTheme = ref<IButton>({display:'DarkMode', color:Theme.DARK})


function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  // Enregistrez la valeur du thème dans le stockage local
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value));
}

// Récupérez la valeur du thème du stockage local lors du chargement du composant
onMounted(() => {
  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = JSON.parse(storedTheme);
  }
});
</script>

<style lang='scss' scoped>
    
</style>