const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  const minCharacters = 4;
  const maxCharacters = 8;
  if (Number(password) && password.length <= maxCharacters && password.length >= minCharacters) {
    return next();
  }
  return res.status(400).json({ message: 'invalid data' });
};

module.exports = passwordValidation;
