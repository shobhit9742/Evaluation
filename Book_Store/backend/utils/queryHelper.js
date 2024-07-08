exports.queryHelper = (model, query) => {
  const { page, limit, sort, ...filters } = query;
  const options = {
    where: filters,
    limit: limit ? parseInt(limit, 10) : 10,
    Offset: page
      ? (parseInt(page, 10) - 1) * (limit ? parseInt(limit, 10) : 10)
      : 0,
    order: sort ? [[sort.split(":")[0], sort.split(":")[1]]] : [],
  };
  return model.findAll(options);
};
