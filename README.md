# SorteioBot
Bot para fazer sorteios de amigo secreto pelo Telegram

## Comandos
- /create ${nomeDoSorteio} - Cria um sorteio
- /join ${nomeDoSorteio} - Entra em um sorteio
- /close ${nomeDoSorteio} - Faz o sorteio e envia pra cada pessoa no privado o seu amigo secreto

## Variaveis de ambiente
- PORT = porta para rodar a aplicação
- TELEGRAM_API= url da api do telegram
- BOT_TOKEN = token do seu bot do telegram
- MONGO_URL= URL para acesso ao banco mongoDB
