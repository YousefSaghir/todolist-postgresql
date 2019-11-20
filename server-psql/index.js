const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = require("./queries");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.json({ info: "Node js, Express , and PostgreSQL API" });
});

app.get("/tasks", db.getTasks);
app.get("/tasks/:id", db.getTasksById);
app.post("/tasks", db.createTask);
app.put("/tasks/:id", db.updateTask);
app.delete("/tasks/:id", db.deleteTask);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
