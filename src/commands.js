const sendMessage = require("./sendMessage");
const {
  createSorteio,
  exists,
  addParticipant,
  checkParticipant,
  getParticipants,
  deleteSorteio,
} = require("./dao");
const shuffle = require("./shuffle");

module.exports = async (req, res) => {
  const message = req.body.message.text;
  if (message) {
    if (message.includes("/create")) {
      await create(req);
    } else if (message.includes("/join")) {
      await join(req);
    } else if (message.includes("/close")) {
      await close(req);
    }
  }
  res.status(200).send();
};

const create = async (req) => {
  const eventName = req.body.message.text.split(" ")[1];
  const chatId = req.body.message.chat.id;
  try {
    if (await exists(eventName)) {
      return sendMessage(chatId, "Esse sorteio já existe");
    }

    await createSorteio(eventName);
    await sendMessage(chatId, `O sorteio ${eventName} foi criado`);
    await sendMessage(
      chatId,
      `Para entrar no sorteio me mande um /join ${eventName}`
    );
  } catch (err) {
    sendMessage(chatId, `Ocorreu um erro interno, por favor tente novamente`);
  }
};

const join = async (req) => {
  const eventName = req.body.message.text.split(" ")[1];
  const user = req.body.message.from;

  try {
    if (!(await exists(eventName))) {
      return sendMessage(user.id, "Esse sorteio não existe");
    }

    if (await checkParticipant(eventName, user.id)) {
      return sendMessage(user.id, "Você já participa desse sorteio");
    }

    await addParticipant(eventName, user);

    await sendMessage(user.id, `Você entrou no sorteio ${eventName}`);
  } catch (err) {
    sendMessage(user.id, `Ocorreu um erro interno, por favor tente novamente`);
  }
};

const close = async (req) => {
  const eventName = req.body.message.text.split(" ")[1];

  try {
    if (!(await exists(eventName))) {
      return sendMessage(req.body.message.chat.id, "Esse sorteio não existe");
    }

    shuffle(await getParticipants(eventName));

    await deleteSorteio(eventName);
  } catch (err) {
    sendMessage(
      req.body.message.chat.id,
      `Ocorreu um erro interno, por favor tente novamente`
    );
  }
};
