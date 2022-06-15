module.exports = (file) => {
  return `${file}?hash=${Date.now()}`
}
