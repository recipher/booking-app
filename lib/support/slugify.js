export default (text) => {
  return text
  .replace(/ /g, '-')
  .replace(/:/g, '')
  .replace(/\(/g, '-')
  .replace(/\)/g, '-')
  .replace(/\+/g, '')
  .replace(/'/g, '')
  .toLowerCase();
};