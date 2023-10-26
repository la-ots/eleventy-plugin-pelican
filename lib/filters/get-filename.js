const path = require("node:path");

module.exports = (pathName) => {
  const parts = path.parse(pathName);

  return parts.base;
};
