const sendMessage = require("./sendMessage");

module.exports = (participants) => {
  let loop = true;
  let index = 0;
  while (loop) {
    let sorteadoIndex = Math.floor(Math.random() * participants.length);
    let sorteado = participants[sorteadoIndex];

    if (sorteado.id !== participants[index].id) {
      sendMessage(participants[index].id, `Você tirou @${sorteado.username}`);

      participants.splice(sorteadoIndex, 1);

      index += 1;

      if (participants.length === 0) {
        loop = false;
      }
    }
  }
};
