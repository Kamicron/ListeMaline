<template>
  <div>
    <button v-if="isLoggedIn" @click="logout">Déconnexion</button>
    <div v-else>
      <LM_connexion />
      <LM_inscription />
    </div>
  </div>
</template>

<script setup lang="ts">
import { authService } from '../../api/services/authService';
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);

const logout = () => {
  authService.logout();
  isLoggedIn.value = false;
};

onMounted(() => {
  isLoggedIn.value = authService.isLoggedIn();
});
</script>
