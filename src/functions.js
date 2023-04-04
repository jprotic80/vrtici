const paginacija = (dataArr, perPage) => {
  const chunks = [];
  const copy = [].concat(...dataArr);
  while (copy.length) {
    chunks.push(copy.splice(0, perPage));
  }

  return chunks;
};

export { paginacija };
