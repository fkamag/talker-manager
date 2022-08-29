const nameValidation = (req, res, next) => {
  const { name } = req.body;
  const minCharacters = 3;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < minCharacters) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

module.exports = nameValidation;