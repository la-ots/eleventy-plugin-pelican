const fs = require('node:fs/promises')
const path = require('node:path')
const sass = require('sass')
const postcss = require('postcss')
const cssnano = require('cssnano')
const esbuild = require('esbuild')

module.exports = async function (eleventyConfig, options) {
  if (!options.assets.bundle) {
    return
  }

  const outDir = eleventyConfig.dir.output || '_site'
  const outFile = 'pelican-gen-bundle'

  fs.mkdir(`${outDir}/pelican/`)
    .catch((error) => {
      if (error.code !== 'EEXIST') {
        console.log(error)
      }
    })

  // build file list for core and user css and javascript
  let cssFiles = []
  let jsFiles = []

  // load core assets if available
  if (options.assets.core) {
    if (options.assets.core.css) {
      cssFiles = cssFiles.concat(options.assets.core.css.map(x => path.join(x[0], x[1])))
    }

    if (options.assets.core.javascript) {
      jsFiles = jsFiles.concat(options.assets.core.javascript.map(x => path.join(x[0], x[1])))
    }
  }

  // load any user defined assets
  if (options.theme) {
    if (options.theme.css) {
      cssFiles = cssFiles.concat(options.theme.css.map(x => path.join(outDir, x)))
    }

    if (options.theme.javascript) {
      jsFiles = jsFiles.concat(options.theme.javascript.map(x => path.join(outDir, x)))
    }
  }

  // build css
  const cssContent = await (await Promise.all(cssFiles.map(async (x) => await fs.readFile(x))))
  if (cssContent.length > 0) {
    try {
      let css = await sass.compileStringAsync(cssContent.join('\n'), {
        loadPaths: [
          path.join(__dirname, '../../'),
          './node_modules'
        ]
      })

      css = await postcss([cssnano]).process(css.css, {
        from: 'undefined'
      })

      fs.writeFile(`${outDir}/pelican/${outFile}.css`, css.css, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.log(error)
    }
  }

  // build js
  const jsContent = await (await Promise.all(jsFiles.map(async (x) => await fs.readFile(x))))
  if (jsContent.length > 0) {
    try {
      const js = await esbuild.transform(jsContent.join('\n'), {
        minify: true,
        legalComments: 'inline'
      })

      fs.writeFile(`${outDir}/pelican/${outFile}.js`, js.code, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.log(error)
    }
  }
}
