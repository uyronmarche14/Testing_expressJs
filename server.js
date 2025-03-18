const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const users = [
  { id: 1, username: "rhyss", display: "Ronmarche14" },
  { id: 2, username: "ron", display: "Ron14" },
  { id: 3, username: "nhor", display: "marche14" },
];

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
