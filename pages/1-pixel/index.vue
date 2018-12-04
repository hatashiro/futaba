<template>
  <div>
    <setting/>
    <graph/>
    <container>
      <im
        v-for="{ id, src } in images"
        :key="id"
        :id="id"
        :src="src"
        :model="model"/>
      <button @click="refreshImages">Refresh images!</button>
    </container>
  </div>
</template>

<script>
import Setting from '~/components/Setting'
import Container from '~/components/Container'
import Graph from '~/components/Graph'
import Im from '~/components/Image'
import { createPixelImage } from '~/libs/image'
import Model from '~/models/1-pixel'

function randomColor() {
  return Math.floor(256 * Math.random())
}

function createData(count) {
  const images = []

  for (let i = 0; i < count; i++) {
    const [r, g, b] = [randomColor(), randomColor(), randomColor()]
    images.push({
      id: (r << 16) + (g << 8) + b,
      src: createPixelImage(r, g, b)
    })
  }

  return images
}

export default {
  components: {
    Setting,
    Container,
    Graph,
    Im
  },

  data() {
    return {
      images: createData(50),
      model: new Model()
    }
  },

  created() {
    this.$store.dispatch('eval/clear')
  },

  methods: {
    refreshImages() {
      this.images = createData(50)
    }
  }
}
</script>
