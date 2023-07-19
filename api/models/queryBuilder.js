const sortingBuilder = (sortBy = "scoreAvg", sortOrder = "desc") => {
  return `ORDER BY ${sortBy} ${sortOrder}`;
};

const paginationBuilder = (limit, offset) => {
  limit = limit || 16;
  offset = offset || 0;
  return `LIMIT ${limit} OFFSET ${offset}`;
};

module.exports = { sortingBuilder, paginationBuilder };
