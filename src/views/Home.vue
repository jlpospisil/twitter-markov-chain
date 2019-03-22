<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-auto">
        <text-input label="User ID" v-model="userId" />
      </div>
    </div>

    <div class="row border my-2" v-for="tweet in tweets">
      <div
        class="col p-2"
        :class="{
          'text-success': tweet.real,
          'text-danger': !tweet.real,
        }"
      >
        {{ tweet.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TextInput } from '@cdpjs/vue-components';

export default {
  name: 'home',
  components: {
    TextInput,
  },
  data() {
    return {
      userId: null,
    };
  },
  computed: {
    ...mapState([
      'tweets',
    ]),
  },
  methods: {
    ...mapActions([
      'generateTweets',
      'getTweetsFromTwitter',
    ]),
  },
  mounted() {
    const { getTweetsFromTwitter, generateTweets } = this;
    getTweetsFromTwitter().then(generateTweets);
  },
};
</script>
