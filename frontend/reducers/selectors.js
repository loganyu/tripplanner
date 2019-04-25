export const asArray = ({ trips }) => (
  Object.keys(trips).map(key => trips[key])
);
