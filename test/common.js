'use strict';

const chai = require('chai');
const config = require('../lib/dotenv-config');

global.expect = chai.expect;
global.config = config;
