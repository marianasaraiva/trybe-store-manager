# :dart: Projeto Store Manager
Projeto desenvolvido no módulo 23, durante o módulo de back-end no curso de desenvolvimento web da Trybe.


## :brain: Habilidades

Construir uma API :

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar a aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.


## :wrench: O que foi desenvolvido

Desenvolvido API utilizando a arquitetura MSC!

A API construída trata-se de um sistema de gerenciamento de vendas, onde foi possível criar, visualizar, deletar e atualizar produtos e vendas, ou seja, realizar o CRUD(Create, Read, Update, Delete).


## :dart: Instruções para visualizar o projeto:

1. Como baixar o projeto

- Realizar o git clone: `git clone git@github.com:marianasaraiva/trybe-store-manager.git`;
- Rodar o comando: `npm install`;
- Inicie o projeto com `npm start` ou `npm run dev`
- Rode os testes com `npm test` ou `npm run test:mocha`
- Criar um arquivo `.env` na raiz do projeto;

- Setar as variavéis de ambiente no arquivo `.env`:
```
  MYSQL_HOST=<nomeDoHost>
  MYSQL_USER=<nomeDoUsuário>
  MYSQL_PASSWORD=<password>
```

2. Documentação da API: 

## :dart: Tabela
```
DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO StoreManager.products (name, quantity) VALUES
    ("Martelo de Thor", 10),
    ("Traje de encolhimento", 20),
    ("Escudo do Capitão América", 30);

INSERT INTO StoreManager.sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES
    (1, 1, 5),
    (1, 2, 10),
    (2, 3, 15);
```
