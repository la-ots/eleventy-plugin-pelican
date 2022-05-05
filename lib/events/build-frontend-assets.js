const fs = require('node:fs/promises')
const path = require('node:path')
const sass = require('sass')
const postcss = require('postcss')
const cssnano = require('cssnano')
const esbuild = require('esbuild')

module.exports = async function (eleventyConfig, options) {
  const outDir = eleventyConfig.dir.output || '_site'

  fs.mkdir(`${outDir}/pelican/`)
    .catch((error) => {
      if (error.code !== 'EEXIST') {
        console.log(error)
      }
    })

  const coreCss = options.assets.core.css.map(x => path.join(x[0], x[1]))
  const userCss = options.theme.css.map(x => path.join(outDir, x))
  const cssContent = await (await Promise.all([...coreCss, ...userCss].map(async (x) => await fs.readFile(x))))

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

    fs.writeFile(`${outDir}/pelican/pelican-gen-bundle.css`, css.css, {
      encoding: 'utf-8'
    })
  } catch (error) {
    console.log(error)
  }

  const coreJs = options.assets.core.javascript.map(x => path.join(x[0], x[1]))
  const userJs = options.theme.javascript.map(x => path.join(outDir, x))
  const jsContent = await (await Promise.all([...coreJs, ...userJs].map(async (x) => await fs.readFile(x))))

  try {
    const js = await esbuild.transform(jsContent.join('\n'), {
      minify: true,
      legalComments: 'inline'
    })

    fs.writeFile(`${outDir}/pelican/pelican-gen-bundle.js`, js.code, {
      encoding: 'utf-8'
    })
  } catch (error) {
    console.log(error)
  }
}
