<template>
<button class="main_button"
        :class="[store.isDark ? 'dark-theme' : 'white-theme']"
        :style="flexClass"
        type="button">
    <p class="nunito-button">{{ button.display}}</p>
    <i v-if="button.icon" :class="button.icon?.iconCode" :style="`font-size: ${button.icon.size}px;`"></i>
    </button>
</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { IconPosition, Theme } from '@/assets/enum/global';
import { IButton } from '@/types/global';
import { store } from '@/store/index';

const props = defineProps({
  button: {type: Object as PropType<IButton>, default: {}}
})

const flexClasses = {
  [IconPosition.UP]: 'flex-direction: column-reverse;',
  [IconPosition.DOWN]: 'flex-direction: column;',
  [IconPosition.RIGHT]: 'flex-direction: row;',
  [IconPosition.LEFT]: 'flex-direction: row-reverse;'
};

const flexClass = props.button.icon ? flexClasses[props.button.icon.position] : '';
console.log('flexClass', flexClass)
</script>

<style lang='scss' scoped>

// fa-duotone fa-house
  .main_button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    font-weight: 400;
    border: .0625rem solid transparent;
    padding: .55rem .95rem;
    line-height: 1.5;
    border-radius: .55rem;
    transition: all .2s ease;
    letter-spacing: .025em;
    font-size: 1rem;
    border-color: $white-color;
    box-shadow: 3px 3px 6px $light-gray-color,-3px -3px 6px #fff;
    color: #31344b;
    background-color:  $white-color;
    cursor: pointer;
    margin-right: .75rem;
    margin-bottom: .75rem;



      &:hover {
    -webkit-tap-highlight-color: rgba(38,40,51,0);
    box-sizing: border-box;
    margin: 0;
    font-weight: 400;
    padding: .55rem .95rem;
    line-height: 1.5;
    border-radius: .55rem;
    transition: all .2s ease;
    letter-spacing: .025em;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    margin-right: .75rem;
    margin-bottom: .75rem;
    color: $dark-color;
    background-color: $white-color;
    border-color: $white-color;
    box-shadow: inset 2px 2px 5px $light-gray-color,inset -3px -3px 7px #fff;
    }
  }

  .dark-theme {
    color: $white-color;
    background-color: $dark-color; /* Couleur de fond pour le thème sombre */
    border-color: $dark-color;
    box-shadow: 3px 3px 6px #2f2a3b,-3px -3px 6px $medium-gray-color;
    &:hover {
      color: $white-color;
      background-color: $dark-color;
      border-color: $dark-color;
      box-shadow: inset 2px 2px 5px $dark-gray-color,inset -3px -3px 7px $medium-gray-color;
    }
  }
</style>