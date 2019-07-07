'use strict';

const path = require('path');
const fs = require('fs');

/**
 *
 * @param {string} customPath
 * @param {string} defaultPath
 * @param {boolean} [required=false] If file is not required then ignore it, if doesn't exist.
 * @return {boolean|string} Return value if exist or undefined.
 * @throws Will throw an error if the file doesn't exists and is required.
 */

function checkIfFileExist(customPath, defaultPath, required = false) {
  const currentWorkdir = process.cwd();
  const file = path.join(currentWorkdir, customPath || defaultPath);
  const fileExist = fs.existsSync(file);

  if (fileExist) {
    return file;
  } if (!fileExist && required) {
    throw new Error(`File doesn't exist: ${file}`);
  }

  return undefined;
}

/**
 *
 * @param {array} array - Configs transferred to array.
 * @return {object} Returns formatted configs.
 */

function arrayToObject(array) {
  const object = {};

  array.forEach((property) => {
    const key = property[0];
    const value = property[1];

    if (typeof (value) === 'object' && value !== null) {
      if (
        (value.require || value.required)
        && process.env[value.env] === undefined
        && value.default === undefined
      ) {
        throw new Error(`Missing required config key: ${key}`);
      }

      object[key] = process.env[value.env] || value.default;
    } else if (typeof (value) === 'string' && process.env[value] !== undefined) {
      object[key] = process.env[value];
    }
  });

  return object;
}

/**
 *
 * @param {object} settings - Settings set by user.
 * @param {string} settings.configPath - Path to config file.
 * @param {string} settings.envPath - Path to file with envs.
 * @return {object} Parsed configs
 */

module.exports = (settings) => {
  const defaultEnvPath = process.env.DOTENV_CONFIG_ENVFILE || '.env';
  const defaultConfigPath = process.env.DOTENV_CONFIG_CONFIGFILE || 'config.json';
  const envPath = checkIfFileExist(settings.envPath, defaultEnvPath);
  const configPath = checkIfFileExist(settings.configPath, defaultConfigPath, true);

  /* eslint-disable */
  require('dotenv').config({ path: envPath });
  /* eslint-disable */
  const config = require(configPath);

  const configArray = Object.entries(config);
  return arrayToObject(configArray);
};
