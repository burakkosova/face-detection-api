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

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "burakkosova",
    password: "",
    database: "smart-brain",
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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
