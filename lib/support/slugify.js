export default (text) => {
  return text.replace(' ', /-/g).toLowerCase();
};