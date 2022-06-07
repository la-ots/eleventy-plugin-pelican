module.exports = (nav, page) => {
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
}
