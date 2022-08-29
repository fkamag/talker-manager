const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!isFormatDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = talkValidation;
