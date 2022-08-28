const express = require('express');
const talkerDb = require('../data/talker.db');

const router = express.Router();

const talkers = async () => {
  const result = await talkerDb.read();
  return result;
};

router.get('/talker', async (req, res) => {
  const result = await talkers();
  res.status(200).json(result);
});

router.get('/talker/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await talkers();
  const talker = result.find((item) => item.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

module.exports = router;
