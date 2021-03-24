Inicializar o backend
Acessar a pasta PDM\backend
1- Baixar os pacotes rodando o comando yarn ou npm na pasta PDM\backend.
2- Criar um banco de dados postgres com o nome aplicacaodb.
3- Realizar a crição da tabela items no banco através do comando:
Usando NPM:
npx sequelize-cli db:migrate

Usando Yarn:
yarn sequelize db:migrate

4- Executar o backend através do comando:
Usando NPM:
npm run dev

Usando Yarn:
yarn dev

----

Inicializar o aplicativo
Acessar a pasta PDM\app
1- Editar o ip contido no arquivo PDM\app\src\services\api.js para o seu IP local, manter a porta 3333.
2- Baixar os pacotes rodando o comando yarn ou npm na pasta PDM\app. 
3- 

