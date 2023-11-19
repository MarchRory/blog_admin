export async function BufferToMd(buffer) {
  const blob = new Blob([new Uint8Array(buffer)])
  const fileReader = new FileReader()
  var res
  fileReader.onload = (e) => {
    res = e.target.result
    return res
  }
  fileReader.readAsText(blob)
}
