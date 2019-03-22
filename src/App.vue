<template>
  <application>
    <top-navbar />

    <application-content>
      <router-view />
    </application-content>
  </application>
</template>

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
