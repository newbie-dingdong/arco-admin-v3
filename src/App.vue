<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style lang="scss">
div {
  box-sizing: border-box;
}
$--input-bg: #fff;
$--input-border: #e5e6eb;
$--primary-blue: #0066FF;
$--input-shadow: #E6F0FF;


.arco-input-wrapper {
  background-color: $--input-bg;
  border: 1px solid $--input-border;
  border-radius: 4px;
}

.arco-select {
  background-color: $--input-bg;
  border: 1px solid $--input-border;
  border-radius: 4px;
}
.arco-input-wrapper.arco-input-focus, .arco-input-wrapper:focus-within {
  border-color: $--primary-blue;
  box-shadow: 0 0 0 0 $--input-shadow;
}

body {
  --arcoblue-6:0, 102, 255;
  --blue-6: 0, 102, 255;
  --blue-1: 232, 243, 255;
  --red-6: 235, 87, 87;
  --red-1: 255, 236, 232;
}

button,.arco-tag {
  border-radius: 4px !important;
}
</style>
