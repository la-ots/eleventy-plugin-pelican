const fs = require('node:fs/promises')
const path = require('node:path')
const sass = require('sass')
const postcss = require('postcss')
const cssnano = require('cssnano')
const esbuild = require('esbuild')
const chalk = require('chalk')

module.exports = async function (eleventyConfig, options) {
  const relativeOutDir = (eleventyConfig.dir.output || '_site') + '/_pelican-assets'
  const outDir = path.resolve(relativeOutDir)
  const outFile = 'pelican-gen-bundle'

  fs.mkdir(`${outDir}`)
    .catch((error) => {
      if (error.code !== 'EEXIST') {
        console.log(error)
      }
    })

  // build file list for core and user css and javascript
  let cssFiles = []
  let jsFiles = []

  // load core assets if requested
  if (options.assets.core) {
    const basePath = path.join(__dirname, '../../../../../')

    if (options.assets.core.css) {
      cssFiles = cssFiles.concat(options.assets.core.css)
    } else {
      cssFiles = cssFiles.concat([
        path.join(basePath, 'node_modules/@la-ots/pelican/dist/css/pelican.min.css'),
        path.join(basePath, 'node_modules/@la-ots/eleventy-plugin-pelican/assets/css/docs.css'),
        path.join(basePath, 'node_modules/@la-ots/eleventy-plugin-pelican/assets/css/prism-theme.css')
      ])
    }

    if (options.assets.core.javascript) {
      jsFiles = jsFiles.concat(options.assets.core.javascript)
    } else {
      jsFiles = jsFiles.concat([
        path.join(basePath, 'node_modules/@la-ots/pelican/dist/js/pelican.bundle.min.js'),
        path.join(basePath, 'node_modules/@la-ots/eleventy-plugin-pelican/assets/js/docs.js')
      ])
    }
  }

  // load any user defined assets
  if (options.assets.custom) {
    if (options.assets.custom.css) {
      cssFiles = cssFiles.concat(options.assets.custom.css)
    }

    if (options.assets.custom.javascript) {
      jsFiles = jsFiles.concat(options.assets.custom.javascript)
    }
  }

  // build and compile css resources
  // only "compile" sass (.scss) files
  if (cssFiles.length > 0) {
    console.log(`[pelican] Compiling CSS to ${relativeOutDir}/${outFile}.css`)

    try {
      let css = ''

      for (const file of cssFiles) {
        let content = await fs.readFile(file, {
          encoding: 'utf-8'
        })
        const ext = file.split('.').pop().toLowerCase()

        if (ext === 'scss') {
          content = await sass.compileStringAsync(content, {
            loadPaths: [
              path.join(__dirname, '../../'),
              './node_modules'
            ]
          })
          content = css.css
        }

        css += '\n' + content
      }

      css = await postcss([cssnano]).process(css, {
        from: 'undefined'
      })

      fs.writeFile(`${outDir}/${outFile}.css`, css.css, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.error(chalk.red(`[pelican] ${error}`))
    }
  }

  // build js
  if (jsFiles.length > 0) {
    console.log(`[pelican] Compiling Javascript to ${relativeOutDir}/${outFile}.js`)

    try {
      let js = ''

      for (const file of jsFiles) {
        const content = await fs.readFile(file, {
          encoding: 'utf-8'
        })

        js += '\n' + content
      }

      js = await esbuild.transform(js, {
        minify: true,
        legalComments: 'inline'
      })

      fs.writeFile(`${outDir}/${outFile}.js`, js.code, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.error(chalk.red(`[pelican] ${error}`))
    }
  }
}
