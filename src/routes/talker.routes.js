const express = require('express');
const talkerDb = require('../data/talker.db');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const result = await talkerDb.read();
  res.status(200).json(result);
});

module.exports = router;
