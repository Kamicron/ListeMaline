<template>
  <div>
    <Alert ref="alertRef" />

    <button @click="addSuccessMessage">Ajouter un message de succès</button>
    <button @click="addErrorMessage">Ajouter un message d'erreur</button>

    <p>token : {{ store.accessToken }}</p>
    <div v-if="store.accessToken === null">
      <h1>Connexion</h1>
        <form  @submit.prevent="handleLogin">
          <div>
            <label for="nom">nom :</label>
            <input type="nom" id="nom" v-model="nom" />
          </div>
          <div>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <button type="submit">Se connecter</button>
        </form>
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

const alertRef = ref<any>(null);

let nom = '';
let password = '';

// Fonction pour ajouter un message de succès
const addSuccessMessage = () => {
  alertRef.value?.addMessage('success', 'Opération réussie !');
};

// Fonction pour ajouter un message d'erreur
const addErrorMessage = () => {
  alertRef.value?.addMessage('error', 'Erreur lors de l\'opération.');
};

const handleLogin = async () => {
  try {
    console.log('initialisation');
  
    const accessToken = await authService.login(nom, password);
    console.log("fin envois");

    // Mettre à jour l'access token dans le store
    store.accessToken = accessToken;
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error);
    // Gérer l'erreur si nécessaire
  }
};

const isLogged = ref<boolean>(false)

// watch (() => store.accessToken, (newVal)=> {
//   if (newVal === null) isLogged.value = false
//   else isLogged.value = true
  
// })

const handleLogout = async () => {
  store.accessToken = null
  // await authService.logout();
};

const showMessageAlert = (status: 'success' | 'error', message: string) => {
  alertRef.value?.addMessage(status, message);
};
</script>
