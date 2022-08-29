const authValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const regexToken = /^[a-zA-Z0-9]{16}$/g;
  const isValid = regexToken.test(token);
  if (!isValid) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

module.exports = authValidation;
