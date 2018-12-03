<template>
  <div class="card">
    <img
      ref="image"
      :src="src"
      class="card-img-top">
    <div class="card-body">
      <p class="card-text">
        {{ pixelText }}
      </p>
      <button
        :class="plusBtnClass"
        class="btn btn-sm"
        @click="evaluateImage(+1)">👍</button>
      <button
        :class="minusBtnClass"
        class="btn btn-sm"
        @click="evaluateImage(-1)">👎</button>
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

    plusBtnClass() {
      return `btn${this.eval > 0 ? '' : '-outline'}-success`
    },

    minusBtnClass() {
      return `btn${this.eval < 0 ? '' : '-outline'}-danger`
    }
  },

  async mounted() {
    this.rgbs = await getRGBs(this.$refs.image)
    console.log('RGBs', this.rgbs)
  },

  methods: {
    ...mapActions('eval', ['evaluate']),

    evaluateImage(val) {
      this.evaluate({ id: this.id, val })
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
