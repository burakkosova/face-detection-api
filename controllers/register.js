const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("invalid form submission");
  }
  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    db("login")
      .transacting(trx)
      .insert({ email, hash })
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({ email: loginEmail[0].email, name, joined: new Date() })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
};

module.exports = {
  handleRegister,
};
