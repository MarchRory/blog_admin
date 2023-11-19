export async function BufferToMd(buffer) {
  const blob = new Blob([new Uint8Array(buffer)])
  const fileReader = new FileReader()
  let res = null
  fileReader.onload = (e) => {
    console.log(e.target.result)
    res = e.target.result
  }
  fileReader.readAsText(blob)
  return res
}
