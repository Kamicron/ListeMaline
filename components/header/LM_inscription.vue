<template>
  <div>
    <form v-if="!store.accessToken" @submit.prevent="handleRegister">
      <div>
        <InputLMInput v-model="name" :properties="inputName" />

        <!-- <label for="name">Nom :</label>
        <input type="text" id="name" v-model="name" /> -->
      </div>
      <div>
        <InputLMInput  v-model="email" :properties="inputEmail" />

        <!-- <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" /> -->
      </div>
      <div>
        <InputLMInput v-model="password" :properties="inputPassword" />

        <!-- <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" /> -->
      </div>
      <ButtonMainButton :button="buttonSubscribe" @click="handleRegister"/>

      <!-- <button type="submit" @click="handleRegister">S'inscrire</button> -->
    </form>
  </div>
</template>

<script setup lang='ts'>
import { authService } from '@/api/services/authService';
import { Theme, TypeInput } from '@/assets/enum/global';
import { IButton, IInput } from '@/types/global';
import { store } from '@/store/index'



let name = '';
let email = '';
let password = '';

const inputName = ref<IInput>({
  placeholder:"Nom De Famille", 
  type:TypeInput.TEXT, 
  color:Theme.DARK,
  label: 'Nom',
  // error: "Ceci est un message d'erreur"
})

const inputEmail = ref<IInput>({
  placeholder:"utilisateur@herbergeur.fr", 
  type:TypeInput.EMAIL, 
  color:Theme.DARK,
  label: 'Email',
  // error: "Ceci est un message d'erreur"
})

const inputPassword = ref<IInput>({
  placeholder:"test25!!", 
  type:TypeInput.PASSWORD, 
  color:Theme.DARK,
  label: 'Mot de passe',
  // error: "Ceci est un message d'erreur"
})

const buttonSubscribe = ref<IButton>({display:"S'inscrire"})

const handleRegister = async () => {
  await authService.register(name, email, password);
};
</script>
