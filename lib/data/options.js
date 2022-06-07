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

  // component configs:

  // // scroll-to-top:
  // url: null

  // // breadcrumbs:
  // home: {
  //   url: null,
  //   text: null,
  // },
  // entries: null,
  // currentPage: null,

  // // header:
  // icon: {
  //   url: null,
  //   altText: null,
  // },
  // title: null,
  // toggleText: null,

  // // page-navigation:
  // pages: null,
  // currentPage: null,

  // // page-title:
  // title: null,
  // summary: null,
  // github: false,
  // repository: null,
  // path: null,
  // buttonText: null,

  // // sidebar:
  // home: null,
  // header: null,
  // title: null,
  // entries: null,
  // currentPage: null,

  // // skip-link:
  // url: null,
  // html: null,
  // text: null,

  // // table-of-contents:
  // title: null,
  // content: null,

  // // new-relic-apm:
  // accountId: null,
  // trustKey: null,
  // agentId: null,
  // licenseKey: null,
  // applicationId: null,
}

module.exports = (options) => {
  return deepmerge(defaultOptions, options)
}
