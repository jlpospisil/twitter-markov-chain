<template>
  <div class="container">
    <div class="row mb-3 justify-content-between">
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
        <!--<button-item class="btn-sm" type="danger" text="Reveal" @click="toggleReveal" />-->
        <span class="mr-3" v-if="scoring">
          {{ totalCorrect }} / {{ tweets.length }}
        </span>

        <button-item
          class="btn-sm ml-2"
          type="success"
          text="Score"
          :disabled="scoring || tweets.length === 0"
          @click="toggleScoring"
        />
      </div>
    </div>

    <p class="mb-2" v-show="tweets.length > 0">
      There are {{ totalReal }} real tweets below, while the other {{ totalFake }} are fake.  Select the tweets that you believe are fake.  Once you think you have selected all of the fake tweets, press the score button to find out how you did!
    </p>

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
import { mapState, mapGetters, mapActions } from 'vuex';
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
      userId: '@realDonaldTrump',
      fake: 5,
      real: 5,
    };
  },
  computed: {
    ...mapState([
      'tweets',
      'reveal',
      'scoring',
    ]),

    ...mapGetters([
      'totalCorrect',
    ]),

    totalFake() {
      const { tweets } = this;
      return tweets.filter(t => !t.real).length;
    },

    totalReal() {
      const { tweets } = this;
      return tweets.filter(t => !!t.real).length;
    },
  },
  methods: {
    ...mapActions([
      'generateTweets',
      'getTweetsFromTwitter',
      'toggleReveal',
      'toggleScoring',
      'toggleSelected',
      'updateUserId',
    ]),

    generateList() {
      const { real, fake, generateTweets } = this;
      generateTweets({ fake, real });
    },

    getTweets() {
      const { getTweetsFromTwitter, generateList } = this;
      getTweetsFromTwitter().then(generateList);
    },

    updateUserIdAndGetTweets() {
      const {
        getTweets, updateUserId, userId, reveal, toggleReveal,
      } = this;
      if (reveal) {
        toggleReveal();
      }
      updateUserId(userId).then(getTweets);
    },
  },
};
</script>
