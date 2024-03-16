<template>
  <div>
    <Alert ref="alertRef" />
    <p>token : {{ store.accessToken }}</p>
    <div v-if="store.accessToken === null">
      <h1>Connexion</h1>
      <div>
        <InputLMInput :input="inputName" />
      </div>
      <div>
        <InputLMInput :input="inputPassword" />
      </div>
      <ButtonMainButton :button="buttonConnexion" @click="handleLogin" />
      <button type="submit">Se connecter</button>
    </div>
    <div v-else>
      <h1>Déconnexion</h1>
      <button @click="handleLogout">Se déconnecter</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { authService } from '@/api/services/authService';
import { store } from '@/store/index'
import Alert from '@/components/global/alert/alert.vue';
import { MessageValidation, Theme, TypeInput } from '@/assets/enum/global';
import { IButton, IInput } from '@/types/global';

const alertRef = ref<any>(null);

let name = '';
let password = '';

const showMessageAlert = (status: MessageValidation.SUCCESS | MessageValidation.ERROR, message: string) => {
  alertRef.value?.addMessage(status, message);
}

const buttonConnexion = ref<IButton>({ display: "Se connecter" })

const inputName = ref<IInput>({
  value: name,
  placeholder: "Nom De Famille",
  type: TypeInput.TEXT,
  color: Theme.DARK,
  label: 'Nom',
  // error: "Ceci est un message d'erreur"
})

const inputPassword = ref<IInput>({
  value: password,
  placeholder: "test25!!",
  type: TypeInput.PASSWORD,
  color: Theme.DARK,
  label: 'Mot de passe',
  // error: "Ceci est un message d'erreur"
})

const handleLogin = async () => {
  try {
    console.log('initialisation');
    console.log('name', inputName.value.value);
    console.log('password', inputPassword.value.value );
    
    const accessToken = await authService.login(inputName.value.value, inputPassword.value.value);
    console.log("fin envois");
    showMessageAlert(MessageValidation.SUCCESS, "Connexion réussis")

    // Mettre à jour l'access token dans le store
    store.accessToken = accessToken;
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error);
    showMessageAlert(MessageValidation.ERROR, error.toString())

    // Gérer l'erreur si nécessaire
  }
};

const isLogged = ref<boolean>(false)

const handleLogout = async () => {
  store.accessToken = null
  // await authService.logout();
};


</script>
