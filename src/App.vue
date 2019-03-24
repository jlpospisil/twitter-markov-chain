<template>
  <application>
    <top-navbar />

    <application-content>
      <router-view />
    </application-content>
  </application>
</template>

<style lang="scss">
.application {
  background-color: rgba(#566f7c, 0.1);
}
</style>

<script>
import { Application, ApplicationContent, TopNavbar } from '@cdpjs/vue-components';

export default {
  components: {
    Application,
    ApplicationContent,
    TopNavbar,
  },
};
</script>
