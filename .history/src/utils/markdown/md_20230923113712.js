export async function BufferToMd(buffer) {
  const blob = new Blob([new Uint8Array(buffer)])
  const fileReader = new FileReader()
  let res = null
  fileReader.onload = (e) => {
    res = e.target.result
  }
  fileReader.readAsText(blob)
  return res
}
