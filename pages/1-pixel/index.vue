<template>
  <div>
    <setting/>
    <graph/>
    <container>
      <im
        v-for="({ id, src }, idx) in images"
        :key="idx"
        :id="id"
        :src="src"/>
    </container>
  </div>
</template>

<script>
import Setting from '~/components/Setting'
import Container from '~/components/Container'
import Graph from '~/components/Graph'
import Im from '~/components/Image'
import { createPixelImage } from '~/libs/image'

function randomColor() {
  return Math.floor(256 * Math.random())
}

export default {
  components: {
    Setting,
    Container,
    Graph,
    Im
  },

  data() {
    const images = []

    for (let i = 0; i < 100; i++) {
      const [r, g, b] = [randomColor(), randomColor(), randomColor()]
      images.push({
        id: (r << 16) + (g << 8) + b,
        src: createPixelImage(r, g, b)
      })
    }

    return { images }
  },

  created() {
    this.$store.dispatch('eval/clear')
  }
}
</script>
