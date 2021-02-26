const sendMessage = require("./sendMessage");

module.exports = (participants) => {
  let loop = true;
  let index = 0;
  let sorteados = 0;
  while (loop) {
    let sorteadoIndex = Math.floor(Math.random() * participants.length);
    let sorteado = participants[sorteadoIndex];

    if (sorteado.id !== participants[index].id && !sorteado.value) {
      sendMessage(participants[index].id, `Você tirou @${sorteado.username}`);

      sorteado.value = true;

      index += 1;
      sorteados += 1;

      if (participants.length === sorteados) {
        loop = false;
      }
    }
  }
};
