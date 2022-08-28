const emailValidation = (req, res, next) => {
  const regexEmail = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { email } = req.body;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'invalid data' });
  }
  next();
};

module.exports = emailValidation;