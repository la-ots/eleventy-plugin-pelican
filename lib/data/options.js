const deepmerge = require('deepmerge')

const defaultOptions = {
  title: 'Louisiana Office of Technology Services (OTS)',
  description: null,
  url: null,
  favicon: null,
  social: {
    image: null
  },
  layouts: {
    sidebar: {
      title: null,
      icon: {
        url: null,
        alt: null
      }
    },
    docs: {
      github: {
        button: false,
        repository: null
      }
    }
  },
  assets: {
    bundle: true,
    core: true,
    custom: {
      css: [],
      javascript: []
    }
  }
}

module.exports = (options) => {
  return deepmerge(defaultOptions, options)
}
