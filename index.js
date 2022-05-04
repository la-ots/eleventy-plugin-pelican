const path = require('node:path')

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const options = require('./lib/data/options.js')(pluginOptions)

  // filters
  eleventyConfig.addFilter('default', require('./lib/filters/default'))
  eleventyConfig.addFilter('titleize', require('./lib/filters/titleize'))
  eleventyConfig.addFilter('capitalize', require('./lib/filters/capitilize'))
  eleventyConfig.addFilter('replaceDash', require('./lib/filters/replace-dash'))
  eleventyConfig.addFilter('addHash', require('./lib/filters/add-hash'))

  // plugins
  eleventyConfig.addPlugin(require('eleventy-plugin-nesting-toc'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-inclusive-language'))
  eleventyConfig.addPlugin(require('eleventy-plugin-reading-time'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'))

  // collections
  eleventyConfig.addCollection('tagList', require('./lib/collections/tag-list'))
  eleventyConfig.addCollection('sidebarNav', require('./lib/collections/side-bar-nav.js'))

  eleventyConfig.addTemplateFormats('scss')
  eleventyConfig.addExtension('scss', require('./lib/extensions/scss.js'))

  // markdown
  eleventyConfig.setLibrary('md', require('./lib/markdown-it')(options))

  // data
  eleventyConfig.addGlobalData('env', () => {
    return {
      development: process.env.ELEVENTY_ENV === 'development',
      production: process.env.ELEVENTY_ENV === 'production'
    }
  })

  // navigation assists for next and previous pages
  eleventyConfig.addFilter('navigationNextPrevious', (nav, page) => {
    let next = null
    let previous = null
    let current = null

    nav.forEach((entry) => {
      if (page.url.toLowerCase().includes(entry.url.toLowerCase())) {
        entry.children.forEach((child) => {
          if (!next && current) {
            next = child
          }
          if (child.url === page.url) {
            current = child
          } else if (!current) {
            previous = child
          }
        })
      }
    })

    return {
      next,
      previous
    }
  })

  // add default configuration
  eleventyConfig.addGlobalData('options', options)

  // include core pelican and plugin assets to /pelican
  eleventyConfig.addPassthroughCopy({
    [path.resolve(__dirname, 'assets/')]: 'pelican',
    [path.resolve(__dirname, 'node_modules/@la-ots/pelican/dist')]: 'pelican'
  })

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid']
  }
}
