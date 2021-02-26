const sendMessage = require("./sendMessage");

module.exports = (participants) => {
  let loop = true;
  let index = 0;
  while (loop) {
    let sorteadoIndex = Math.floor(Math.random() * participants.length);
    let sorteado = participants[sorteadoIndex];

    sendMessage(participants[index], `Você tirou @${sorteado.username}`);

    participants.splice(sorteadoIndex, 1);

    if (participants.length === 0) {
      loop = false;
    }
  }
};
