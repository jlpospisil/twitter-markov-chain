<template>
    <div class="tweet row" :class="{ selected }" @click="$emit('click', $event)">
      <div class="col">
        <div>
          <strong>
            User Name
          </strong>
          <span class="text-muted">
            {{ userId | twitterId }}
          </span>
        </div>

        <div class="p-1" v-html="text"></div>
      </div>
    </div>
</template>

<style lang="scss">
.tweet {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  margin: 10px 0;
  padding: 15px 5px 25px;
  border-radius: 4px;

  &.selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Tweet',
  props: {
    text: { type: String, default: null },
    selected: { type: Boolean, default: false },
  },
  computed: {
    ...mapState([
      'userId',
    ]),
  },
  filters: {
    twitterId(id) {
      return `${String(id).charAt(0) === '@' ? '' : '@'}${id}`;
    },
  },
};
</script>
