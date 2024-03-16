# Composant Alert

Ce composant `Alert` est conçu pour afficher des messages d'alerte à l'utilisateur. Ces messages peuvent être de type `success` (succès) ou `error` (erreur), et sont automatiquement retirés après 5 secondes.

## Structure du Composant

### Template

```HTML
<template>
  <div class="alerts">
    <transition-group name="list" tag="div">
      <div v-for="message in messages" :key="message.id" :class="['alert', message.type]">
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>
```

### Script

```TS
<script setup lang='ts'>
import { ref, defineExpose } from 'vue';

interface Message {
  id: number;
  text: string;
  type: 'success' | 'error';
}

const messages = ref<Array<Message>>([]);
let nextId = 1;

const addMessage = (type: 'success' | 'error', text?: string) => {
  const defaultText = type === 'success' ? 'Requête réussie !' : 'Erreur : ';
  messages.value.unshift({ id: nextId++, text: text || defaultText, type });
  setTimeout(() => {
    messages.value.pop();
  }, 5000);
};

defineExpose({ addMessage });

</script>
```

### Styles

```SCSS
<style lang="scss" scoped>
.alerts {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 250px;
}

.alert {
  background-color: #00c58e;
  color: white;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.list-move {
  transition: transform 0.5s;
}

.success {
  background-color: #00c58e;
}

.error {
  background-color: #ff4c4c;
}
</style>
```

Dans l'exemple ci-dessous, nous avons un composant Vue qui intègre un système d'alerte. Ce système d'alerte est géré par un composant `Alert` dont la référence est stockée dans `alertRef`. La méthode `addMessage` du composant `Alert` est utilisée pour déclencher des messages d'alerte, qui peuvent être de type `success` ou `error`. En fonction des actions de l'utilisateur, différents messages d'erreur ou de succès peuvent être affichés.

### Cas d'utilisation
```html
<template>
  <div>
    <button class="button" @click="() => showMessageAlert('success', 'Opération réussie !')">Afficher l'Alerte de Succès</button>
    <button class="button" @click="() => showMessageAlert('error', 'Une erreur est survenue')">Afficher l'Alerte d'Erreur</button>

    <Alert ref="alertRef" />
  </div>
</template>

<script setup lang='ts'>
import Alert from '/components/global/alert/alert.vue';

const alertRef = ref<typeof Alert | null>(null);

const showMessageAlert = (status: 'success' | 'error', message: string) => {
  alertRef.value?.addMessage(status, message);
};
</script>
``` 
