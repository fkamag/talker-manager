const fs = require('fs').promises;
const { join } = require('path');

const file = join(__dirname, '../talker.json');

const read = async () => {
  const content = await fs.readFile(file, 'utf8');
  const result = JSON.parse(content);
  return result;
};

module.exports = {
  read,
};
