module.exports = (value) => {
  return value
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(" ");
};
