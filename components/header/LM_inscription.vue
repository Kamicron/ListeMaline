<template>
  <div>
    <h1>Inscription</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" @click="handleRegister">S'inscrire</button>
    </form>
  </div>
</template>

<script setup lang='ts'>

let name = '';
let email = '';
let password = '';

const handleRegister = async () => {
  await authService.register(name, email, password);
};
</script>
