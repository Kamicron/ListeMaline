<template>
  <div>
    <Alert ref="alertRef" />
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
      <ButtonMainButton :button="buttonDeconnexion" @click="handleLogout"/>
    </div>
    <p>token : {{ store.accessToken }}</p>

  </div>
</template>

<script setup lang='ts'>
import { authService } from '@/api/services/authService';
import { store } from '@/store/index'
// import Alert from '@/components/global/alert/alert.vue';
import { IconPosition, MessageValidation, Theme, TypeInput } from '@/assets/enum/global';
import { IButton, IInput } from '@/types/global';

const alertRef = ref<any>(null);

let name = '';
let password = '';

const showMessageAlert = (status: MessageValidation, message: string) => {
  if (alertRef.value) {
    alertRef.value.addMessage(status, message);
  } else {
    console.error("La référence d'alerte n'est pas définie.");
  }
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


const valueName = ref('')
const valuePassword = ref('')

const buttonDeconnexion = ref<IButton>({
  display:'Déconnexion', 
  icon: {
    position: IconPosition.RIGHT, 
    iconCode: "fa-duotone fa-power-off", 
    size: 30, 
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
    inputPassword.value.error ? inputPassword.value.error.display = "Identifiants ou mot de passe incorrrect" : inputPassword.value.error = undefined
    inputName.value.error ? inputName.value.error.display = "Identifiants ou mot de passe incorrrect" : inputName.value.error = undefined
    const errorMessage = error ? error.toString() : "Une erreur inconnue s'est produite.";
    showMessageAlert(MessageValidation.ERROR, errorMessage);
    // Gérer l'erreur si nécessaire
  }
};

const isLogged = ref<boolean>(false)

const handleLogout = async () => {
  store.accessToken = null
  // await authService.logout();
};


</script>
