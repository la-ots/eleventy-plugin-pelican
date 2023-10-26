module.exports = (collection) => {
  return collection
    .getAll()
    .filter((item) => (item.data || {}).excludeFromSidebar !== true);
};
