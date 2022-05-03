module.exports = (md, options) => {
  var opts = md.utils.assign({}, {
    prefix: 'fa',
    tag: 'i',
  }, options || {});

  opts.regex = new RegExp(`:${opts.prefix}\\s+([\\d\\w\\s\\-]+):`, 'g')

  const render = (tokens, idx) => {
    return tokens[idx].content
  }

  const replace = (md, options) => {
    return (state) => {
      const blocks = state.tokens
      const length = blocks.length
      let token = null
      let tokens = null
  
      for (let i=0; i<length; i++) {
        if (blocks[i].type !== 'inline') { continue }
        tokens = blocks[i].children
  
        for (let j = tokens.length - 1; j >= 0; j--) {
          token = tokens[j]
  
          if (token.type === 'text' && options.regex.test(token.content)) {
            token.content = token.content.replace(options.regex, (match, classes) => {
              token.type = 'html_block'
              return `<${options.tag} class="${classes}"></${options.tag}>`
            })
  
            tokens[j] = token
            blocks[i].children = tokens
          }
        }
      }
    }
  }

  md.renderer.rules.emoji = render  
  md.core.ruler.push('font_awesome', replace(md, opts))
}
