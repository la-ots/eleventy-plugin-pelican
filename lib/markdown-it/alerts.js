/* Usage:
 * ::: info title
 * body information
 * :::
 */

const types = {
  info: {
    container: 'alert alert-info bg-info-10',
    icon: 'fas fa-info-circle',
  },
  danger: {
    container: 'alert alert-danger bg-danger-10,',
    icon: 'fas fa-exclamation-triangle',
  },
  warning: {
    container: 'alert alert-warning bg-warning-10',
    icon: 'fas fa-exclamation-circle',
  },
  success: {
    container: 'alert alert-success bg-success-10',
    icon: 'fas fa-check-circle',
  }
}

const pattern = new RegExp(`^(${Object.keys(types).join('|')})\\s+(.*)$`)

module.exports = {
  validate: (params) => {
    return params.trim().match(pattern)
  },

  render: (tokens, idx) => {
    if (tokens[idx].nesting == 1) {
      const match = tokens[idx].info.trim().match(pattern)
      const type = types[match[1]]

      let res = `<div class="${type.container}" role="alert">`
      if (match[2]) {
        res += `<span class="${type.icon}"></span>\n`
        res += `<strong>${match[2]}</strong>`
      }
      return res
    } else {
      return '</div>'
    }
  }
}
