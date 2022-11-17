
### ABOUT

This projec is designed to act as a point of use for future front-end projects.

Users are able to create, view, update and delete reviews for games as well as creating comments for specific reviews.
In addition, votes are also able to be added to reviews to give an indication to the quality of a game.

### HOSTED LINK

A link to the hosted database and endpoints can be found at:

https://good-ruby-viper-coat.cyclic.app/

To view the available APIs make a request to '/api'.

### ✔️ 1. CLONE THE REPO

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Command:
```
$ git clone https://github.com//georgehayfield31/NC-Project.git
```

### ✔️ 2. INSTALL DEPENDENCIES
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
```programming
$ npm install
```
For issues encountered during installation
```programming
$ npm audit fix
```

### ✔️ 3. DOTENV

To run the project locally create the following files in the root directory:
```programming
.env.development
.env.test
```

The contents of these files should be as follows:

``` .env.development: ```
```
PGDATABASE=nc_games
```

``` .env.test: ```
```
PGDATABASE=nc_games_test
```

### ✔️ 4. SEED THE LOCAL DATABASE
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

To seed the database prior to running the following commands should be run:
```
$ npm run setup-dbs
$ npm run seed
```

### ✔️ 5. RUN TESTS
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) 

To run the comprehensive test suite run the command:
```
$ npm test
```

### ✔️ 6. USAGE
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

To start the server, run the command:
```
$ npm start
```

## Node.js and Postgres
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

This project was created using:
```
$ node -v | v16.13.0
$ psql -V | 14.5
```