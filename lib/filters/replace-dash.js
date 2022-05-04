module.exports = (value) => {
  if (!value) {
    return ''
  }

  return value.toString().replace(/-/g, ' ')
}
