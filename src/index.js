require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
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

app.listen(process.env.PORT, async () => {
  console.log("Api rodando na porta " + process.env.PORT);
  await axios.post(
    `${process.env.TELEGRAM_API}${process.env.BOT_TOKEN}/setWebhook`,
    `${process.env.API_URL}`
  );
});
