<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <InputLMInput :input="inputEmail" />
        <!-- <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" /> -->
      </div>
      <div>
        
        <InputLMInput :input="inputPassword" />
        <!-- <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" /> -->
      </div>
      <ButtonMainButton :button="buttonLogIn"/>

      <!-- <button type="submit">Se connecter</button> -->
    </form>

    <ButtonMainButton :button="buttonLogOut" @click="handleLogout"/>

    <!-- <button @click="handleLogout">Se déconnecter</button> -->
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { authService } from '../../api/services/authService'
import { IButton, IInput } from '../../types/global';
import { Theme, TypeInput } from '../../assets/enum/global';



let email = '';
let password = '';

const inputEmail = ref<IInput>({
  value: email, 
  placeholder:"utilisateur@herbergeur.fr", 
  type:TypeInput.EMAIL, 
  color:Theme.DARK,
  label: 'Email',
  // error: "Ceci est un message d'erreur"
})

const inputPassword = ref<IInput>({
  value: password, 
  placeholder:"test25!!", 
  type:TypeInput.PASSWORD, 
  color:Theme.DARK,
  label: 'Mot de passe',
  // error: "Ceci est un message d'erreur"
})

const buttonLogIn = ref<IButton>({display:'Se connecter', color:Theme.DARK})
const buttonLogOut = ref<IButton>({display:'Se déconnecter', color:Theme.DARK})

const handleLogin = async () => {
  await authService.login(email, password);
};

const handleLogout = async () => {
  await authService.logout();
};
</script>import { ref } from 'vue';
import { TypeInput, Theme } from '../../assets/enum/global';
import { IInput } from '../../types/global';

