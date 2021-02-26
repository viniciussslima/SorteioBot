require("dotenv").config({
  path:
    process.env.NODE_ENV === "development"
      ? ".development.env"
      : process.env.NODE_ENV === "production"
      ? ".production.env"
      : ".env",
});

const express = require("express");
const mongoose = require("mongoose");
const commands = require("./commands");

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.json());
app.post(`/${process.env.BOT_TOKEN}`, commands);

app.listen(process.env.API_PORT, () => {
  console.log("Api rodando na porta " + process.env.API_PORT);
});
