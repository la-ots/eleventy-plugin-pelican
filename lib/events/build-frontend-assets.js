const fs = require('node:fs/promises')
const path = require('node:path')
const sass = require('sass')
const postcss = require('postcss')
const cssnano = require('cssnano')
const esbuild = require('esbuild')
const chalk = require('chalk')
const debug = require('debug')('Pelican')

module.exports = async function (eleventyConfig, options) {
  const relativeOutDir = (eleventyConfig.dir.output || '_site') + '/_pelican-assets'
  const outDir = path.resolve(relativeOutDir)
  const outFile = 'pelican-gen-bundle'

  fs.mkdir(`${outDir}`)
    .catch((error) => {
      if (error.code !== 'EEXIST') {
        console.log(chalk.red(error))
      }
    })

  // build file list for core and user css and javascript
  let cssFiles = []
  let jsFiles = []

  // load core assets if requested
  if (options.assets.core) {
    let nodeModules = path.join(__dirname, '../../../../../node_modules/')
    if (options.assets.nodeModulesPath) {
      nodeModules = options.assets.nodeModulesPath
    }

    const pluginAssets = path.join(__dirname, '../../assets/')

    debug('Node modules path: %s', nodeModules)
    debug('Plugin assets path: %s', pluginAssets)

    if (options.assets.core.css) {
      cssFiles = cssFiles.concat(options.assets.core.css)
    } else {
      cssFiles = cssFiles.concat([
        path.join(nodeModules, '@la-ots/pelican/dist/css/pelican.min.css'),
        path.join(pluginAssets, 'css/docs.scss'),
        path.join(pluginAssets, 'css/prism-theme.css')
      ])
    }

    if (options.assets.core.javascript) {
      jsFiles = jsFiles.concat(options.assets.core.javascript)
    } else {
      jsFiles = jsFiles.concat([
        path.join(nodeModules, '@la-ots/pelican/dist/js/pelican.bundle.min.js'),
        path.join(pluginAssets, 'js/docs.js')
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

  // load any custom SASS load paths
  let sassLoadPaths = [
    path.join(__dirname, '../../assets/css'),
    path.join(__dirname, '../../node_modules'),
    './node_modules'
  ]

  debug('dirname: %s', __dirname)

  if (options.assets.sassLoadPaths) {
    sassLoadPaths = [...sassLoadPaths, ...options.assets.sassLoadPaths]
    sassLoadPaths = sassLoadPaths.filter((item, pos) => sassLoadPaths.indexOf(item) === pos)
  }

  debug('(S)CSS to compile: %O', cssFiles)
  debug('JS to compile: %O', jsFiles)
  debug('SASS load paths: %O', sassLoadPaths)

  // build and compile css resources
  if (cssFiles.length > 0) {
    console.log(chalk.yellow(`[pelican] Compiling CSS to ${relativeOutDir}/${outFile}.css`))

    try {
      const css = []

      for (const file of cssFiles) {
        const content = await sass.compileAsync(file, {
          loadPaths: sassLoadPaths
        })

        css.push(content.css)
      }

      const compiledCss = await postcss([cssnano]).process(css.join('\n\n'), {
        from: undefined
      })

      fs.writeFile(`${outDir}/${outFile}.css`, compiledCss.css, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.error(chalk.red(`[pelican] ${error}`))
    }
  }

  // build js
  if (jsFiles.length > 0) {
    console.log(chalk.yellow(`[pelican] Compiling Javascript to ${relativeOutDir}/${outFile}.js`))

    try {
      let js = ''

      for (const file of jsFiles) {
        js += '\n' + await fs.readFile(file, {
          encoding: 'utf-8'
        })
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
