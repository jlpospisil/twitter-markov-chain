<template>
  <div class="container">
    <div class="row mb-5 justify-content-between">
      <div class="col-auto">
        <text-input class="d-inline-block" v-model="userId" placeholder="Twitter ID" />
        <button-item
          class="btn-sm ml-2"
          type="primary"
          text="Generate"
          @click="updateUserIdAndGetTweets"
        />
      </div>

      <div class="col-auto">
        <button-item class="btn-sm" type="danger" text="Reveal" @click="toggleReveal" />
        <button-item class="btn-sm ml-2" type="success" text="Score" />
      </div>
    </div>

    <tweet
      :key="`tweet-${index}`"
      v-for="(tweet, index) in tweets"
      :text="tweet.text"
      :selected="!!tweet.selected"
      :real="tweet.real"
      @click="toggleSelected(index)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { TextInput, ButtonItem } from '@cdpjs/vue-components';
import Tweet from '@/components/Tweet.vue';

export default {
  name: 'home',
  components: {
    TextInput,
    Tweet,
    ButtonItem,
  },
  data() {
    return {
      userId: null,
    };
  },
  computed: {
    ...mapState([
      'tweets',
      'reveal',
    ]),
  },
  methods: {
    ...mapActions([
      'generateTweets',
      'getTweetsFromTwitter',
      'toggleReveal',
      'toggleSelected',
      'updateUserId',
    ]),

    generate() {
      const { getTweetsFromTwitter, generateTweets } = this;
      getTweetsFromTwitter().then(generateTweets);
    },

    updateUserIdAndGetTweets() {
      const {
        generate, updateUserId, userId, reveal, toggleReveal,
      } = this;
      if (reveal) {
        toggleReveal();
      }
      updateUserId(userId).then(generate);
    },
  },
};
</script>
