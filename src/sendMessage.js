const axios = require("axios");

module.exports = async (chat_id, text) => {
  const body = {
    chat_id,
    text,
  };

  return await axios.post(
    `${process.env.TELEGRAM_API}${process.env.BOT_TOKEN}/sendMessage`,
    body
  );
};
