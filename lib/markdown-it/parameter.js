/* Usage:
 * ::: param name:type
 * body information
 * :::
 */

module.exports = {
  validate: (params) => {
    return params.trim().match(/^param\s+(.*)$/)
  },

  render: (tokens, idx) => {
    const match = tokens[idx].info.trim().match(/^param\s+(.*)$/)

    if (tokens[idx].nesting === 1) {
      let res = '<div class="doc-parameter">';
      const parameters = match[1].split(':')
      
      res += `<strong>${parameters[0]}</strong> <code>${parameters[1]}</code>`
      return res
    } else {
      return '</div>'
    }
  }
}
