<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style lang="scss">
  $enable-cssgrid: true;
  @import 'bootstrap/scss/bootstrap.scss';
  @import '@/assets/styles.scss';

  pre {
    color: white;
  }
</style>
