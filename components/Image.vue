<template>
  <div
    v-show="setting.applyFilter ? setting.filterBy < prediction : true"
    class="card">
    <img
      ref="image"
      :src="src"
      class="card-img-top">
    <div class="card-body">
      <p class="card-text">
        <template v-if="setting.showFirstPixel">{{ pixelText }} /</template>
        <template v-if="prediction">{{ prediction }}</template>
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
    },
    model: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      seen: false,
      rgbs: null,
      prediction: null
    }
  },

  computed: {
    pixelText() {
      return this.rgbs ? `R${this.rgbs[0]}G${this.rgbs[1]}B${this.rgbs[2]}` : ''
    },

    eval() {
      return this.$store.state.eval.evaluation[this.id]
    },

    setting() {
      return this.$store.state.setting
    },

    features() {
      return this.rgbs.map(color => color / 256)
    }
  },

  watch: {
    'model.updated'() {
      this.updatePrediction()
    }
  },

  async mounted() {
    this.installIntersectionObserver()
    this.rgbs = await getRGBs(this.$refs.image)
    this.updatePrediction()
  },

  methods: {
    ...mapActions('eval', ['evaluate']),

    async evaluateImage(val) {
      if (!this.setting.applyFilter) {
        this.evaluate({ id: this.id, val })
        this.model.fit([this.features], [[val]])
      }
    },

    installIntersectionObserver() {
      this.intersectionObserver = new IntersectionObserver(
        entries => entries.forEach(this.onIntersection),
        {
          threshold: 0.2
        }
      )

      this.intersectionObserver.observe(this.$refs.image)
    },

    updatePrediction() {
      this.prediction = this.model.predict(this.features)
    },

    onIntersection({ isIntersecting }) {
      if (isIntersecting) {
        this.seen = true
      } else if (this.seen && this.eval === undefined) {
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
