const path = require("node:path");

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const options = require("./lib/data/options.js")(pluginOptions);

  // filters
  eleventyConfig.addFilter("titleize", require("./lib/filters/titleize"));
  eleventyConfig.addFilter("capitalize", require("./lib/filters/capitilize"));
  eleventyConfig.addFilter(
    "replaceDash",
    require("./lib/filters/replace-dash")
  );
  eleventyConfig.addFilter("addHash", require("./lib/filters/add-hash"));
  eleventyConfig.addFilter(
    "navigationNextPrevious",
    require("./lib/filters/navigation-next-previous.js")
  );
  eleventyConfig.addFilter(
    "getFileName",
    require("./lib/filters/get-filename.js")
  );

  // plugins
  eleventyConfig.addPlugin(require("eleventy-plugin-nesting-toc"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-inclusive-language"));
  eleventyConfig.addPlugin(require("eleventy-plugin-reading-time"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));

  // collections
  eleventyConfig.addCollection(
    "tagList",
    require("./lib/collections/tag-list")
  );
  eleventyConfig.addCollection(
    "sidebarNav",
    require("./lib/collections/side-bar-nav.js")
  );

  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", require("./lib/extensions/scss.js"));

  // markdown
  eleventyConfig.setLibrary("md", require("./lib/markdown-it")(options));

  // data
  eleventyConfig.addGlobalData("env", () => {
    return {
      development: process.env.ELEVENTY_ENV === "development",
      production: process.env.ELEVENTY_ENV === "production",
    };
  });

  // trigger asset bundler
  eleventyConfig.on("eleventy.after", async () => {
    require("./lib/events/build-frontend-assets.js")(eleventyConfig, options);
  });

  // always include base Pelican images:
  eleventyConfig.addPassthroughCopy({
    [path.resolve(__dirname, "assets/img")]: "_pelican-assets/img",
  });

  // add default configuration
  eleventyConfig.addGlobalData("options", options);

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
  };
};
