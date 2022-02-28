const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

app.use(express.json());
app.use(cors());

let port = process.env.PORT;
const db = knex({
  client: "pg",
  connection: {
    host: "ec2-54-156-110-139.compute-1.amazonaws.com",
    port: port,
    user: "kmpskgpbfrnlcj",
    password:
      "500d25e5030fb3fc1117d6cf6a3680fd83ddc5cacde9757d5059a1dd67866782",
    database: "d6ll4sosloat1j",
  },
});

// app.get("/", (req, res) => {
//   db.select()
//     .table("users")
//     .then(data => res.json(data));
// });

app.post("/signin", (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
