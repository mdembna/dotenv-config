module.exports = {
  test: {
    require: false,
    required: true,
    env: 'HOST',
  },
  port: 'PORT',
  random: 'UNDEFINED_VAR',
  default: {
    required: true,
    env: 'DEFAULT',
    default: 'default',
  },
};
