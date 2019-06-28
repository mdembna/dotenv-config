# dotenv-config

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.org/tetrash/dotenv-config.svg?branch=master)](https://travis-ci.org/tetrash/dotenv-config)
[![codecov](https://codecov.io/gh/tetrash/dotenv-config/branch/master/graph/badge.svg)](https://codecov.io/gh/tetrash/dotenv-config)
![node](https://img.shields.io/node/v/dotenv-config.svg)

Module that loads environment variables and verify their presence

## How to use it

**config.json**
```json
{
  "test": {
    "require": true,
    "env": "HOST"
  },
  "port": "PORT",
  "default": {
    "require": true,
    "env": "DEFAULT",
    "default": "default value"
  }
}
```

**.env**
```.env
HOST=localhost
PORT=4000
```

**index.js**
```javascript
const config = require('dotenv-config')();

console.log(config.test); // localhost

module.exports = config;
```

### Additional settings

```javascript
const config = require('dotenv-config');

const settings = {
  
};

config(settings);
```
