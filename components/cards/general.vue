<template>
  <div class="general_cards" :class="store.isDark? 'dark-theme' : 'white-theme'">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { store } from '@/store/index';
</script>

<style lang='scss' scoped>
.general_cards {
  padding: 20px;
  font-family: "Nunito Sans",sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  color: $dark-color;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: .0625rem solid $gray-neu;
  border-radius: .55rem;
  background-color: $white-color;
  border-color: $gray-neu;
  transition: all .2s ease;
  box-shadow: 6px 6px 12px $dark-neu,-6px -6px 12px $light-neu;
  position: relative;
  width: 100%;
  margin: 20px 0;
}

.dark-theme {
    color: $white-color;
    background-color: $dark-color;
    border-color: $dark-color;
    box-shadow: 6px 6px 12px $dark-gray-color,-6px -6px 12px $medium-gray-color;
  }
</style>