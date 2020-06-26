const filterBody = (body, ...fields) => {
  const filteredBody = {};
  fields.forEach((field) => {
    if (body[field]) filteredBody[field] = body[field];
  });
  return filteredBody;
};

module.exports = filterBody;
