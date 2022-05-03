module.exports = (collection) => {
  let tagSet = new Set()
  collection.getAll().forEach((item) => {
    if ("tags" in item.data) {
      let tags = item.data.tags
      if (typeof tags === "string") {
        tags = [tags]
      }

      tags = tags.filter((item) => {
        switch(item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "nav":
          case "post":
          case "posts":
            return false
        }

        return true
      })

      for (const tag of tags) {
        tagSet.add(tag)
      }
    }
  })

  return [...tagSet].sort()
}
