const Sorteio = require("./model");

const createSorteio = async (name) => {
  let sorteio = new Sorteio({
    name,
    participants: [],
  });
  await sorteio.save();
};

const exists = async (name) => {
  let sorteio = await Sorteio.findOne({ name });
  if (!!sorteio) {
    return true;
  }

  return false;
};

const addParticipant = async (name, user) => {
  return await Sorteio.updateOne({ name }, { $push: { participants: user } });
};

const checkParticipant = async (name, id) => {
  let sorteio = await Sorteio.findOne({ name });
  if (
    sorteio.participants.findIndex((participant) => participant.id === id) ===
    -1
  ) {
    return false;
  }
  return true;
};

const getParticipants = async (name) => {
  return (await Sorteio.findOne({ name })).participants;
};

const deleteSorteio = async (name) => {
  return await Sorteio.deleteOne({ name });
};

module.exports = {
  createSorteio,
  exists,
  addParticipant,
  checkParticipant,
  getParticipants,
  deleteSorteio,
};
