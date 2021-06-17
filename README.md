# Upload de imagem

> Simples upload de imagens, quando rodando em desenvolvimento as imagens são salvas localmente, quando em produção elas são salvas no s3 da Amazon.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento.

### 🔧 Instalação

Instalando as dependências:

```
npm install
ou
yarn
```

Crie um arquivo com o seguinte nome .env na raiz do projeto e cole esse código:

```
APP_URL = http://localhost:3333

PATH_UPLOAD = ./tmp/uploads

// caso esteja em desenvolvimento altere o "s3" para "local"
STORAGE_TYPE = s3
```
Caso tenha um Bucket configurado, adicione mais esse código ao arquivo .env:
```
AWS_ACCESS_KEY_ID = Your Access key ID
AWS_SECRET_ACCESS_KEY = Your Secret access key
AWS_DEFAUL_REGION = Your Region bucket
```

### 🔰 Banco de dados
> Instale o [PostgreSQL](https://www.postgresql.org/download/), e sem seguida crie um database com o seguinte nome:
```
  uploads
```

> na raiz do projeto crie um arquivo com o seguinte nom ***"ormconfig.json"***
> e cole esse código dentro, e coloque as credências do seu banco de dados.
```
  {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "your username",
    "password": "your password",
    "database": "your database",
    "entities": [
       "src/entities/**.ts"
    ],
    "migrations": [
       "src/database/migrations/**.ts"
    ],
    "cli": {
       "migrationsDir": "src/database/migrations"
    }
 }
```

### 🔥 Inicar a aplicação
```
npm run dev
ou
yarn dev
```

### 📛 Rotas
* Listar todos as imagens tipo "get".
  
  ```
    https://localhost:3333/uploads
  ```

* Listar uma imagem tipo "get".
  
  ```
    https://localhost:3333/uploads/:id
  ```

* Upload uma imagem tipo "post".
  
  ```
    https://localhost:3333/uploads
  ```

* Deleta uma imagem tipo "delete".
  
  ```
    https://localhost:3333/uploads/:id
  ```

## 🛠️ Tecnologias

* [Multer](https://github.com/expressjs/multer) 
* [Multer-s3](https://github.com/badunk/multer-s3) 
* [Aws-s3](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/Welcome.html)
* [Typescript](https://www.typescriptlang.org/)
* [PostgreSql](https://www.postgresql.org/docs/)
* [Express](https://expressjs.com/en/starter/installing.html)
* [TypeOrm](https://typeorm.io/)
* [Dotenv](https://github.com/motdotla/dotenv)

---
⌨️ com ❤️ por [Jocimar Costa](https://github.com/jocimarjsc) 😊