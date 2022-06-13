const deepmerge = require('deepmerge')
const path = require('node:path')

const baseAssetsPath = path.join(__dirname, '../../')

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
    core: {
      css: [
        path.join(baseAssetsPath, 'node_modules/@la-ots/pelican/dist/css/pelican.min.css'),
        path.join(baseAssetsPath, 'assets/css/docs.css'),
        path.join(baseAssetsPath, 'assets/css/prism-theme.css')
      ],
      javascript: [
        path.join(baseAssetsPath, 'node_modules/@la-ots/pelican/dist/js/pelican.bundle.min.js'),
        path.join(baseAssetsPath, 'assets/js/docs.js')
      ]
    },
    custom: {
      css: [],
      javascript: []
    }
  }
}

module.exports = (options) => {
  return deepmerge(defaultOptions, options)
}
