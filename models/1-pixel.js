import * as tf from '@tensorflow/tfjs'

export default class Model {
  constructor() {
    this.meta = {
      learningRate: 0.1,
      epochs: 100
    }

    const layers = [
      tf.layers.dense({ inputShape: [3], units: 3, activation: 'sigmoid' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]

    this.model = tf.sequential({ layers })

    const sgd = tf.train.sgd(this.meta.learningRate)
    this.model.compile({ optimizer: sgd, loss: 'binaryCrossentropy' })

    this.updated = 0

    this.fitQueue = []

    this.fitLoop = this.fitLoop.bind(this)
    this.fitLoop()
  }

  fit(x, y) {
    this.fitQueue.push([tf.tensor2d(x), tf.tensor2d(y), x.length])
  }

  async fitLoop() {
    if (this.fitQueue.length) {
      const [x, y, batchSize] = this.fitQueue.shift()
      await this.model.fit(x, y, {
        batchSize,
        epochs: this.meta.epochs
      })
      this.updated = Date.now()
    }
    setTimeout(this.fitLoop, 100)
  }

  predict(x) {
    x = Array.from(x)
    const data = this.model.predict(tf.tensor2d(x, [1, 3])).dataSync()
    return data[0]
  }
}
