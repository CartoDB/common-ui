<template>
  <div class="home">
    <h1>I'm a catalog</h1>
    <router-link :to="{ name: 'do-summary' }">Go to Summary</router-link>
  </div>
</template>

<script>
export default {
  name: "DOCatalog"
};
</script>
