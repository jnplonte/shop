# SHOP ANGULAR
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()


## Dependencies
* nodejs: [https://nodejs.org/](https://nodejs.org/en/)
* angular: [https://angular.io/](https://angular.io/)
* typescript: [https://webpack.github.io/](https://webpack.github.io/)
* lodash: [https://lodash.com/](https://lodash.com/)
* sass: [http://sass-lang.com/](http://sass-lang.com/)
* material: [https://material.io/](https://material.io/)
* webpack: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
* karma: [https://karma-runner.github.io](https://karma-runner.github.io/1.0/index.html)


## Installation
- install typescript globally `npm install -g typescript`
- install karma-cli globally `npm install -g karma-cli`
- install npm dependencies by running `npm install`


## Creating Blueprints
- component : `npm run generate:component -- name-of-component`
- directive : `npm run generate:directive -- name-of-directive`
- pipe : `npm run generate:pipe -- name-of-pipe`
- service : `npm run generate:service -- name-of-service`
- *NOTE: it uses angular cli with custom script loacted on `{root}/config/generate.js`*


## How to Use
- run `npm start` it will listen to default http://localhost:8181
- *NOTE: port can be changed on `{root}/config/webpack.dev.js`*


## Testing
- run `npm run test` -> this will run unit testing
- run `npm run lint` -> this will run typescript linter
- *NOTE: all test are just basic one and some is not complete, i dont have enough time to finish this*


## Building Production
- run `npm run build`
- *NOTE: production files can be found on `{root}/dist`*


## Mock API
- **[GET]**  `http://5a53845c77e1d20012fa06e7.mockapi.io/api/v1/products`
- **[POST]**  `http://5a53845c77e1d20012fa06e7.mockapi.io/api/v1/login`
- **[POST]**  `http://5a53845c77e1d20012fa06e7.mockapi.io/api/v1/checkout`
- *NOTE: api config can be found on `{root}\config\site\client\config.json`*