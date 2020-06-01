<template>
  <a class="button"
    :class="[{ 'is-outline': isOutline,
              'reverse-colors': reverseColors,
              'extra-border': extraBorder,
              color: color},
              color
              ]"
    :href="url">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name:"Button",
  props: {
    url: String,
    isOutline: Boolean,
    reverseColors: Boolean,
    extraBorder: Boolean,
    color: String
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 4px;
  background: $button__bg-color;
  color: $button__color;
  font: 600 12px/16px $title__font-family;
  letter-spacing: 0;
  cursor: pointer;

  &:hover {
    background-color: $button__bg-color--hover;
  }

  &.engine-blue {
    background-color: $engine-blue;
  }
}

.reverse-colors {
  background: $button__color;
  color: $button__bg-color;

  &:hover {
    background-color: darken($button__color, 2);
  }
}

.is-outline {
  border: 1px solid $button-outline__border-color;
  background: transparent;
  color: $button-outline__color;

  &:hover,
  &:focus {
    background-color: rgba($black, 0.02);
  }

  &.extra-border {
    border-width: 2px;
  }

  &.engine-blue {
    border-color: $engine-blue;
    background: transparent;
    color: $engine-blue;
  }
}
</style>