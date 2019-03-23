<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-auto">
        <text-input label="User ID" v-model="userId" />
      </div>
    </div>

    <tweet
      :key="`tweet-${index}`"
      v-for="(tweet, index) in tweets"
      :text="tweet.text"
      :selected="!!tweet.selected"
      @click="toggleSelected(index)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TextInput } from '@cdpjs/vue-components';
import Tweet from '@/components/Tweet.vue';

export default {
  name: 'home',
  components: {
    TextInput,
    Tweet,
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
      'toggleSelected',
    ]),
  },
  mounted() {
    const { getTweetsFromTwitter, generateTweets } = this;
    getTweetsFromTwitter().then(generateTweets);
  },
};
</script>
