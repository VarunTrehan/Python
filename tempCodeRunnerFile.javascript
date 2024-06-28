Technologies used : ExpressJS+NodeJS for backend

Database : 
MySQL

Front-end:
ReactJS
Established a connection between express server and MySQL database
Then, created an API, posted the data into localhost:4000/users
In front-end, fetched data from the API and displayed it
make sure that commands are also entered correctly, capital letters also matter
const express = require("express");
const mysql = require("mysql2");
const cors = require('cors')
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Amar@123",
  database: "notes_app",
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO notes (title, contents) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "User added successfully" });
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notes WHERE id = ?", [id], (err) => {
    if (err) res.json({ message: "Failed to delete data" });
    res.json({ message: "Task deleted successfully" });
  });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

function ToDoList() {
  const title = "Prepare for semester";
  const fetchData = () => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => setResponse(response.data))
      .catch((e) => console.log("Unable to fetch data due to ", e));
  };
  const [response, setResponse] = useState();
  const [updateData, setUpdateData] = useState(0);
  useEffect(fetchData, [updateData]);
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const add = () => {
    axios
      .post("http://localhost:4000/users", {
        title: title,
        content: content,
      })
      .then(() => {
        setUpdateData(updateData + 1);
        setContent("");
      })
      .catch((e) => console.log("Not able to post data due to ", e));
  };

  if (!response) return <>Loading</>;
  console.log(response);
  const tasks = response.map((elements) => {
    return (
      <Task
        id={elements.id}
        title={elements.title}
        content={elements.contents}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "600px",
        gap: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(175, 126, 235)",
          width: "300px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "7px 7px 7px grey",
        }}
      >
        <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
          To Do List
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          width: "300px",
          display: "flex",
          padding: "10px",
          margin: "10px",
          flexDirection: "column",
          boxShadow: "7px 7px 7px grey",
        }}
      >
        {tasks}
      </div>
      <div style={{ boxShadow: "7px 7px 7px grey", height: "30px", display:'flex' }}>
        <input
          onChange={handleChange}
          value={content}
          style={{ height: "100%" }}
        ></input>
        <button
          onClick={add}
          style={{
            backgroundColor: "rgb(175, 126, 235)",
            border: "none",
            display: "flex",
            fontSize: "40px",
            alignItems: "center",
        }}
      >
        +
      </button>
    </div>
  </div>
);
}

export default ToDoList;
