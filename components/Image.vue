<template>
  <div class="card">
    <img
      ref="image"
      :src="src"
      class="card-img-top">
    <div class="card-body">
      <p class="card-text">
        <template v-if="setting.showFirstPixel">{{ pixelText }}</template>
      </p>
      <button
        :class="`btn${this.eval > 0 ? '' : '-outline'}-success`"
        class="btn btn-sm"
        @click="evaluateImage(1)">👍よさげ</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRGBs } from '~/libs/image'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      rgbs: null
    }
  },

  computed: {
    pixelText() {
      return this.rgbs ? `${this.rgbs[0]} ${this.rgbs[1]} ${this.rgbs[2]}` : ''
    },

    eval() {
      return this.$store.state.eval.evaluation[this.id]
    },

    setting() {
      return this.$store.state.setting
    }
  },

  async mounted() {
    this.rgbs = await getRGBs(this.$refs.image)
    console.log('RGBs', this.rgbs)

    this.installIntersectionObserver()
  },

  methods: {
    ...mapActions('eval', ['evaluate']),

    evaluateImage(val) {
      this.evaluate({ id: this.id, val })
    },

    installIntersectionObserver() {
      this.intersectionObserver = new IntersectionObserver(
        entries => entries.forEach(this.onIntersection),
        {
          threshold: 1.0
        }
      )

      this.intersectionObserver.observe(this.$refs.image)
    },

    onIntersection({ isIntersecting }) {
      if (isIntersecting && !this.eval) {
        this.evaluateImage(0)
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 50px;
}

.card:last-child {
  margin-bottom: 0;
}
</style>
