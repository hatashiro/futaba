async function waitImageLoad(img) {
  if (img.complete) return

  return new Promise((resolve, reject) => {
    img.addEventListener('load', resolve)
    img.addEventListener('error', reject)
  })
}

export async function getRGBs(img) {
  await waitImageLoad(img)

  const { naturalWidth: width, naturalHeight: height } = img

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  context.drawImage(img, 0, 0, width, height)

  const data = context.getImageData(0, 0, width, height).data

  const result = []
  for (let i = 0; i < width * height; i += 4) {
    const [r, g, b] = data.slice(i, i + 4)
    result.push(r, g, b)
  }

  return result
}

export function createPixelImage(r, g, b) {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d')
  const image = context.createImageData(1, 1)
  image.data[0] = r
  image.data[1] = g
  image.data[2] = b
  image.data[3] = 255 // opacity: 1
  context.putImageData(image, 0, 0)
  return canvas.toDataURL('image/png')
}
