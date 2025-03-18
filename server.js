const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const users = [
  { id: 1, username: "rhyss", display: "Ronmarche14" },
  { id: 2, username: "ron", display: "Ron14" },
  { id: 3, username: "nhor", display: "marche14" },
];

// Add body-parser middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
});

app.get("/api/home", (req, res) => {
  res.json({
    message: "Like thiss like thisss",
    people: ["berry", "john", "geh"],
  });
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId))
    return res.status(400).send({ msg: "badrequest, invalid ID" });

  const findusers = users.find((user) => user.id === parsedId);

  if (!findusers) return res.sendStatus(404);
  return res.send(findusers);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("Not found");
});
