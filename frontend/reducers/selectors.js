export const asArray = (entity) => (
  Object.keys(entity).map(key => entity[key])
);
