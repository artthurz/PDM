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

3- Executar o projecto usando o comando "expo start".

4- Após isso o servidor de desenvolvimento estará rodando e poderá ser acessado através do QR Code, usando o aplicativo do Expo disponivel na Play Store ou caso tiver iPhone, pode acessar diretamente pela câmera dele.

