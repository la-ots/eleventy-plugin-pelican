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

  const outDir = path.resolve(eleventyConfig.dir.output || '_site')
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
      cssFiles = cssFiles.concat(options.assets.core.css)
    }

    if (options.assets.core.javascript) {
      jsFiles = jsFiles.concat(options.assets.core.javascript)
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

  // build and compile css resources
  // only "compile" sass (.scss) files
  if (cssFiles.length > 0) {
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

      fs.writeFile(`${outDir}/pelican/${outFile}.css`, css.css, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.log(error)
    }
  }

  // build js
  if (jsFiles.length > 0) {
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

      fs.writeFile(`${outDir}/pelican/${outFile}.js`, js.code, {
        encoding: 'utf-8'
      })
    } catch (error) {
      console.log(error)
    }
  }
}
