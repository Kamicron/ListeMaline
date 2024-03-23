<template>
  <div>
    <Alert ref="alertRef" />
    <p>token : {{ store.accessToken }}</p>
    <div v-if="store.accessToken === null">
      <h1>Connexion</h1>
      <div>
        <InputLMInput v-model="valueName" :properties="inputName" />
      </div>
      <div>
        <InputLMInput v-model="valuePassword" :properties="inputPassword" />
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
  placeholder: "Nom De Famille",
  type: TypeInput.TEXT,
  color: Theme.DARK,
  label: 'Nom',
  error: {
    display: "",
    enable: true
  }})

const valueName = ref('')
const valuePassword = ref('')

const inputPassword = ref<IInput>({
  placeholder: "test25!!",
  type: TypeInput.PASSWORD,
  color: Theme.DARK,
  label: 'Mot de passe',
  error: {
    display: "",
    enable: true
  }
})

const handleLogin = async () => {
  try {
    console.log('initialisation');
    console.log('name', valueName);
    console.log('password', valuePassword );
    
    const accessToken = await authService.login(valueName.value, valuePassword.value);
    console.log("fin envois");
    showMessageAlert(MessageValidation.SUCCESS, "Connexion réussis")

    // Mettre à jour l'access token dans le store
    store.accessToken = accessToken;
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error);
    inputPassword.value.error.display = "Identifiants ou mot de passe incorrrect"
    inputName.value.error.display = "Identifiants ou mot de passe incorrrect"
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
