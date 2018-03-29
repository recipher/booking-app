const fs = require('fs');

const slugify = (text) => {
  return text
  .replace(/ /g, '-')
  .replace(/:/g, '')
  .replace(/\(/g, '-')
  .replace(/\)/g, '-')
  .replace(/\+/g, '')
  .replace(/'/g, '')
  .toLowerCase();
};

const rename = file => fs.renameSync(file, slugify(file));

fs.readdirSync(__dirname).forEach(rename);