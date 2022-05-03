const deepmerge = require('deepmerge')

const defaultOptions = {
  title: 'Louisiana Office of Technology Services (OTS)',
  description: null,
  url: null,
  theme: {
    favicon: null,
    css: [],
    javascript: [],
  },
  social: {
    image: null,
  },
  // github: {
  //   editButton: false,
  //   repository: null,
  // },
  // newRelicApm: {
  //   accountId: null,
  //   trustKey: null,
  //   agentId: null,
  //   licenseKey: null,
  //   applicationId: null,
  // },

  // // page configs:
  // social: {
  //   title: null,
  //   description: null,
  //   image: null,
  // }

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
