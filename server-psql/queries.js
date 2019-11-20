const Pool = require("pg").Pool;
const pool = new Pool({
  user: "cyf",
  host: "localhost",
  database: "cyf_todolist",
  password: "sghysf81"
});

const getTasks = (req, res) => {
  pool.query("SELECT * FROM tododb ORDER BY id ASC", (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const getTasksById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM tododb WHERE ID = $1", [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const createTask = (req, res) => {

  const { task, status } = req.body;
console.log( task, status );
  pool.query(
    "INSERT INTO tododb (task,status)VALUES($1,$2)",
    [task, status],
    (err, result) => {
      if (err) throw err;
      res.status(201).send(`Task Added with ID: ${result.insertId}`);
    }
  );
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { task, status } = req.body;
console.log( task, status );
console.log( id );
  pool.query(
    "UPDATE tododb SET task = $1, status = $2 WHERE id = $3",
    [task, status, id],
    (err, result) => {
      if (err) throw err;
      res.status(200).send(`Task modified with ID: ${id}`);
    }
  );
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM tododb WHERE id = $1", [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(`Task deleted with ID: ${id}`);
  });
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask
};
