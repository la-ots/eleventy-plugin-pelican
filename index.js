const path = require('path')

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

  // markdown
  eleventyConfig.setLibrary('md', require('./lib/markdown-it')(options))

  // data
  eleventyConfig.addGlobalData("env", () => {
    return {
      development: process.env.ELEVENTY_ENV === "development",
      production: process.env.ELEVENTY_ENV === "production",
    }
  })

  // navigation assists for next and previous pages
  eleventyConfig.addFilter("navigationNextPrevious", (nav, page) => {
    let next = null
    let previous = null
    let current = null
    let x = []

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
      next: next,
      previous: previous
    }
  })

  // add default configuration
  eleventyConfig.addGlobalData('options', options)

  // include core pelican assets to /pelican
  eleventyConfig.addPassthroughCopy({
    [path.resolve(__dirname, 'assets/img/icon-dot-gov.svg')]: 'pelican/icon-dot-gov.svg',
    [path.resolve(__dirname, 'assets/img/icon-https.svg')]: 'pelican/icon-https.svg',
    [path.resolve(__dirname, 'assets/img/louisiana-state-seal.png')]: 'pelican/louisiana-state-seal.png',
    [path.resolve(__dirname, 'node_modules/@la-ots/pelican/dist/css/pelican.min.css')]: 'pelican/pelican.min.css',
    [path.resolve(__dirname, 'node_modules/@la-ots/pelican/dist/css/pelican.min.css.map')]: 'pelican/pelican.min.css.map',
    [path.resolve(__dirname, 'node_modules/@la-ots/pelican/dist/js/pelican.bundle.min.js')]: 'pelican/pelican.bundle.min.js',
    [path.resolve(__dirname, 'node_modules/@la-ots/pelican/dist/js/pelican.bundle.min.js.map')]: 'pelican/pelican.bundle.min.js.map',
    [path.resolve(__dirname, 'assets/css/docs.css')]: 'pelican/docs.css',
    [path.resolve(__dirname, 'assets/css/prism-theme.css')]: 'pelican/prism-theme.css',
    [path.resolve(__dirname, 'assets/js/docs.js')]: 'pelican/docs.js',
  })

  return {
    templateFormats: ["md", "njk", "html", "liquid"]
  }
}
