/* Usage:
 * :chip type text:
 */

const types = {
  required: {
    container: "badge badge-danger"
  },
  standard: {
    container: "badge badge-info"
  },
  default: {
    container: "badge badge-success"
  },
  suggestion: {
    container: "badge badge-ui-light"
  },
  caution: {
    container: "badge badge-warning"
  },
}

module.exports = (md, options) => {
  var opts = md.utils.assign({}, {
    prefix: 'chip',
    tag: 'span'
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

      for (let i=0; i < length; i++) {
        if (blocks[i].type !== 'inline') { continue }
        tokens = blocks[i].children

        for (let j = tokens.length - 1; j >= 0; j--) {
          token = tokens[j]

          if (token.type === 'text' && options.regex.test(token.content)) {
            token.content = token.content.replace(options.regex, (match, body) => {
              token.type = 'html_block'
              const type = body.substr(0, body.indexOf(' '))
              const text = body.substr(body.indexOf(" "))
              return `<${options.tag} class="${types[type].container}">${text}</${options.tag}>`
            })

            tokens[j] = token
            blocks[i].children = tokens
          }
        }
      }
    }
  }

  md.core.ruler.push('chip', replace(md, opts))
}
