<template>
  <div id="setting">
    <div>
      <input
        v-model="showFirstPixel"
        type="checkbox">
      Show the first pixel RGB
    </div>
    <div>
      <input
        v-model="showGraph"
        type="checkbox">
      Show graph
    </div>
    <button @click="clearEvaluation">Clear evaluation</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const computedSetting = key => ({
  get() {
    return this.$store.state.setting[key]
  },
  set(value) {
    this.$store.dispatch('setting/set', { key, value })
  }
})

export default {
  computed: {
    showFirstPixel: computedSetting('showFirstPixel'),
    showGraph: computedSetting('showGraph')
  },

  methods: {
    ...mapActions('eval', { clearEvaluation: 'clear' })
  }
}
</script>

<style scoped>
#setting {
  position: fixed;
  top: 0;
  right: 0;
  background: #444;
  color: white;
  padding: 5px;
  opacity: 0.5;
  z-index: 100;
}
</style>
