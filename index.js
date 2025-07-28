const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 3000;
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server has started ${port}`);
});

app.get("/game/postgame", (req, res) => {
  res.render("post.ejs");
});

let data = [
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 1,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 2,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 3,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 4,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 5,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 6,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 7,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 8,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 9,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 10,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 11,
    mon: "Rupees: ₹50",
  },
  {
    id: uuidv4(),
    Username: "satishmedar",
    p: 12,
    mon: "Rupees: ₹50",
  },
];
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/game", (req, res) => {
  res.render("index.ejs", { data });
});

app.post("/game", (req, res) => {
  let id = uuidv4();
  let { name, number, Username, money } = req.body;
  let mon = `Rupees: ₹${money}`;
  let p = `Guessed Number is : ${number}`;
  data.push({ id, number, Username, p, mon });
  console.log(mon);
  res.redirect("/game");
});

app.get("/game/:id/edit", (req, res) => {
  let { id } = req.params;
  let person = data.find((p) => id == p.id);
  if (person == undefined) {
    res.render("error.ejs");
  } else {
    res.render("edit.ejs", { person });
  }
});

app.patch("/game/:id", (req, res) => {
  let { id } = req.params;
  let person = data.find((p) => id == p.id);
  let newUsername = req.body.Username;
  person.Username = newUsername;
  res.redirect("/game");
});

let number = 99;
app.delete("/game/:id", (req, res) => {
  let { id } = req.params;
  data = data.filter((p) => id != p.id);
  res.redirect("/game");
});

let winningNumber = 99; // default value

app.post("/set-number", (req, res) => {
  const { winningNumber: newNumber } = req.body;
  winningNumber = newNumber;
  res.status(200).json({ message: "Number updated" });
});
app.delete("/game", (req, res) => {
  res.render("winners.ejs", { data, winningNumber });
});
