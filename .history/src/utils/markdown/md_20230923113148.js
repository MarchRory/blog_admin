export async function BufferToMd(buffer) {
  const blob = new Blob([...buffer])
  const fileReader = new FileReader()
  let res = null
  fileReader.readAsText(blob)
  fileReader.onload = (e) => {
    console.log(e.target.result)
    res = e.target.result
  }
  return res
}
