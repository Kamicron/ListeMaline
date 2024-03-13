<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <LMInscription />

    <h1>Déconnexion</h1>
    <button @click="handleLogout">Se déconnecter</button>
  </div>
</template>

<script setup lang='ts'>
import { authService } from '../../api/services/authService'

let email = '';
let password = '';

const handleLogin = async () => {
  await authService.login(email, password);
};

const handleLogout = async () => {
  await authService.logout();
};
</script>
