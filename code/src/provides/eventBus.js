export default (callback, delay=3000) => {
  let interval
  let isRunning = false
  const dataset = new Array()

  const run = item => {
    const data = dataset.shift()
    if (data) {
      isRunning = true
      callback(data)
    } else {
      isRunning = false
      clearInterval(interval)
    }
  }

  return {
    add: item => {
      dataset.push(item)
      if (!isRunning) interval = setInterval(run, delay, item)
    }
  }
} 
