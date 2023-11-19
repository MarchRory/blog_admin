export async function BufferToMd(buffer) {
  const blob = new Blob([new Uint8Array(buffer)])
  const fileReader = new FileReader()
  let res = ''
  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      res = e.target.result
    }
    fileReader.readAsText(blob)
  })
}
