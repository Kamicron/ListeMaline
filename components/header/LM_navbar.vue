<template>
  <div class="navbar">
    <NuxtLink class="navbar__button" to="/">
      <ButtonMainButton :button="buttonHome" />
    </NuxtLink>
    <NuxtLink class="navbar__button" to="/produits">
      <ButtonMainButton :button="buttonProduct" />
    </NuxtLink>
    <NuxtLink class="navbar__button" to="/test">
      <ButtonMainButton :button="buttonTest" />
    </NuxtLink>
    <NuxtLink class="navbar__button" to="/profil/panier">
      <ButtonMainButton :button="buttonPanier" />
    </NuxtLink>
    <div class="navbar__button">
      <HeaderLMTheme />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IButton } from "@/types/global";

const buttonHome = ref<IButton>({ display: "Acceuil" });
const buttonTest = ref<IButton>({ display: "Test" });
const buttonProduct = ref<IButton>({ display: "Produit" });
const buttonPanier = ref<IButton>({ display: "Panier" });
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
}
</style>
