<template>
  <div
    v-show="setting.showGraph"
    id="graph"/>
</template>

<script>
/* global Plotly */
export default {
  computed: {
    setting() {
      return this.$store.state.setting
    },

    eval() {
      return this.$store.state.eval.evaluation
    },

    graphLayout() {
      return {
        showlegend: false,
        scene: {
          aspectmode: 'cube',
          xaxis: {
            title: 'R',
            range: [0, 255]
          },
          yaxis: {
            title: 'G',
            range: [0, 255]
          },
          zaxis: {
            title: 'B',
            range: [0, 255]
          }
        }
      }
    },

    evalData() {
      const positive = []
      const negative = []
      Object.entries(this.eval).forEach(([key, value]) => {
        const intKey = parseInt(key, 10)
        if (isNaN(intKey)) return

        const rgb = [intKey >> 16, (intKey >> 8) % 256, intKey % 256]

        if (value) {
          positive.push(rgb)
        } else {
          negative.push(rgb)
        }
      })

      return [positive, negative]
    }
  },

  watch: {
    evalData() {
      this.renderGraph()
    }
  },

  mounted() {
    this.renderGraph()
  },

  methods: {
    createData({ name, data, symbol, size }) {
      return {
        name,
        x: data.map(([r]) => r),
        y: data.map(([, g]) => g),
        z: data.map(([, , b]) => b),
        mode: 'markers',
        marker: {
          symbol,
          size,
          opacity: 0.8
        },
        type: 'scatter3d'
      }
    },

    renderGraph() {
      const [positive, negative] = this.evalData
      Plotly.react(
        this.$el,
        [
          this.createData({
            name: 'positive',
            data: positive,
            symbol: 'circle',
            size: 6
          }),
          this.createData({
            name: 'negative',
            data: negative,
            symbol: 'x',
            size: 3
          })
        ],
        this.graphLayout
      )
    }
  }
}
</script>

<style scoped>
#graph {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 600px;
  height: 600px;
  background-color: white;
  z-index: 99;
  opacity: 0.7;
}
</style>
