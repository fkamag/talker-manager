const fs = require('fs').promises;
const { join } = require('path');

const file = join(__dirname, '../talker.json');

const read = async () => {
  const content = await fs.readFile(file, 'utf8');
  const result = JSON.parse(content);
  return result;
};

const save = (content) => fs.writeFile(file, JSON.stringify(content));

const insert = async (item) => {
  const users = await read();
  users.push(item);
  await save(users);
};

module.exports = {
  read,
  save,
  insert,
};
