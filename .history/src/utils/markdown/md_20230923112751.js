export function BufferToMd(buffer) {
  const blob = new Blob([buffer])
  const fileReader = new FileReader()
  let res = null
  reader.onload = (e) => {
    res = e.target.result
  }
  return res
}
