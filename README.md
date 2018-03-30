# Nodejs ES6 boilterplate

* add nodemon for auto restart
* add express for webserver
* add babel for transpile es6
  * babel-cli
  * babel-core
  * babel-preset
    * babel-preset-es2015-node6 # for performance
    * babel-preset-stage-3      # for async-await syntax
* add config for app configuration

* directory structure
```sh
$ tree
├── LICENSE
├── README.md
├── app
│   └── index.js  # server main file
├── config
│   ├── development.json  # development config file. -> NODE_ENV='development'
│   └── production.json   # production config file -> NODE_ENV='production'
├── package.json
├── scripts
│   └── nodemon.js        # nodemon launch script for auto restart
└── yarn.lock             # yarn lock file
```

* run
```sh
$ git clone https://github.com/chungheepark/nodejs-es6-boilerplate

# use yarn

$ yarn
$ yarn start

# or npm

$ npm install
$ npm start

# and nodemon watch app directory.
# if you edit files in app,
# server will restart automatically
```
