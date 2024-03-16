<template>
  <div>
    <HeaderLMNavbar/>
    <!-- <button v-if="isLoggedIn" @click="logout">Déconnexion</button>
    <div v-else> -->
      <HeaderLM_connexion />
      <HeaderLM_inscription />
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
// import { authService } from '../../api/services/authService';

// const isLoggedIn = ref(false);

// const logout = () => {
//   authService.logout();
//   isLoggedIn.value = false;
// };

onMounted(() => {
  // isLoggedIn.value = authService.isLoggedIn();
});
</script>
