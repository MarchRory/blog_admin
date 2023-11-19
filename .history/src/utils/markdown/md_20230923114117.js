export async function BufferToMd(buffer) {
  const blob = new Blob([new Uint8Array(buffer)])
  const fileReader = new FileReader()
  let res = ''
  return new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      res = e.target.result
    }
    fileReader.error = (e) => {
      message.error = 'md文件解析失败'
      reject(e)
    }
    fileReader.readAsText(blob)
  })
}
