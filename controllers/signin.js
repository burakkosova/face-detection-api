const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("invalid form submission");
  }
  db("users")
    .join("login", "users.email", "=", "login.email")
    .select("*")
    .where("users.email", email)
    .then((data) => {
      if (data.length !== 0 && bcrypt.compareSync(password, data[0].hash)) {
        // res.json({
        //   id: data[0].id,
        //   name: data[0].name,
        //   email: data[0].email,
        //   entries: data[0].entries,
        //   joined: data[0].joined,
        // });
        delete data[0].hash;
        return res.json(data[0]);
      } else {
        return res.status(400).json("invalid user credentials");
      }
    })
    .catch((err) => res.status(400).json("error signing in"));
};

module.exports = {
  handleSignIn,
};
