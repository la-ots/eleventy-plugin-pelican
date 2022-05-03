const markdownIt = require('markdown-it')
const markdownItContainer = require('markdown-it-container')

module.exports = (options = {}) => {
  const opts = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }

  const md = new markdownIt(opts)
    .use(require('markdown-it-anchor'), {
      permalink: false
    })
    .use(require('markdown-it-task-lists'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-attrs'))
    .use(require('@toycode/markdown-it-class'), {
      'table': 'table table-striped',
      'thead': 'thead-light',
      'blockquote': 'blockquote'
    })
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-image-figures'), {
      figcaption: true
    })
    .use(require('./markdown-it/font-awesome'))
    .use(require('./markdown-it/chip'))
    .use(markdownItContainer, 'alerts', require('./markdown-it/alerts'))
    .use(markdownItContainer, 'param', require('./markdown-it/parameter'))

  return md
}
