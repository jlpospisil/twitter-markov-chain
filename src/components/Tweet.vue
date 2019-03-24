<template>
    <div
      class="tweet row"
      :class="{ selected }"
      @click="$emit('click', $event)"
    >
      <div class="col-auto d-flex align-items-center pl-2 pr-0">
        <template v-if="scoring">
          <icon type="regular" name="fa-check-circle text-success" :size="2" v-if="correct" />
          <icon type="regular" name="fa-times-circle text-danger" :size="2" v-else />
        </template>
        <icon :size="2" v-else />
      </div>

      <div class="col pl-1">
        <div>
          <strong>
            {{ userName }}
          </strong>

          <span class="text-muted">
            {{ userId | twitterId }}
          </span>

          <span
            class="badge float-right pt-1"
            :class="`badge-${real ? 'primary' : 'danger'}`"
            v-show="reveal || scoring"
          >
            {{ real ? 'Real' : 'Fake' }}
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
  padding: 15px 5px 25px 0;
  border-radius: 4px;
  font-size: 0.75rem;
  background-color: #fff;

  &.selected {
    background-color: rgba(#566f7c, 0.15);
  }
}
</style>

<script>
import { mapState } from 'vuex';
import { Icon } from '@cdpjs/vue-components';

export default {
  name: 'Tweet',
  components: {
    Icon,
  },
  props: {
    text: { type: String, default: null },
    real: { type: Boolean, default: null },
    selected: { type: Boolean, default: false },
  },
  computed: {
    ...mapState([
      'userId',
      'userName',
      'reveal',
      'scoring',
    ]),

    correct() {
      const { selected, real } = this;
      return selected !== real;
    },
  },
  filters: {
    twitterId(id) {
      return `${String(id).charAt(0) === '@' ? '' : '@'}${id}`;
    },
  },
};
</script>
