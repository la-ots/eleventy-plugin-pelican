const sass = require("sass");
const path = require("node:path");

module.exports = {
  outputFileExtension: "css",

  compile: function (inputContent, inputPath) {
    const parsed = path.parse(inputPath);

    if (parsed.name.startsWith("_")) {
      return;
    }

    const result = sass.compileString(inputContent, {
      loadPaths: [
        parsed.dir || ".",
        this.config.dir.includes,
        "./node_modules",
      ],
    });

    return function (data) {
      return result.css;
    };
  },
};
