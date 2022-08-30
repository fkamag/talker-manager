const express = require('express');
const talkerDb = require('../data/talker.db');
const emailValidation = require('../middleware/email.validation');
const generateToken = require('../middleware/generateToken');
const passwordValidation = require('../middleware/password.validation');
const authValidation = require('../middleware/auth.validation');
const nameValidation = require('../middleware/name.validation');
const ageValidation = require('../middleware/age.validation');
const talkValidation = require('../middleware/talk.validation');
const rateValidation = require('../middleware/rate.validation');

const router = express.Router();

const talkers = async () => {
  const result = await talkerDb.read();
  return result;
};

router.get('/talker', async (req, res) => {
  const result = await talkers();
  res.status(200).json(result);
});

router.get('/talker/search', authValidation, async (req, res) => {
  const { q } = req.query;
  const array = await talkers();
  const result = array.filter((item) => item.name.includes(q));
  return res.status(200).json(result);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await talkers();
  const talker = result.find((item) => item.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

router.post('/login', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

router.post('/talker', authValidation, nameValidation, ageValidation,
talkValidation, rateValidation, async (req, res) => {
  const data = req.body;
  const array = await talkers();
  const dataWithId = { id: array.length + 1, ...data };
  await talkerDb.insert(dataWithId);
  res.status(201).json(dataWithId);
});

router.put('/talker/:id', authValidation, nameValidation, ageValidation,
talkValidation, rateValidation, async (req, res) => {
  const id = Number(req.params.id);
  const array = await talkers();
  const talker = array.find((t) => t.id === id);
  if (talker) {
    const index = array.indexOf(talker);
    const updated = { id, ...req.body };
    array.splice(index, 1, updated);
    await talkerDb.save(array);
    return res.status(200).json(updated);
  }
});

router.delete('/talker/:id', authValidation, async (req, res) => {
  const id = Number(req.params.id);
  const array = await talkers();
  const talker = array.filter((t) => t.id !== id);
  await talkerDb.save(talker);
  return res.status(204).end();
});

module.exports = router;
