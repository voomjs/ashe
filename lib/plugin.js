const Joi = require('joi')
const Ashe = require('./ashe')

class Plugin {
  /**
   * Plugin package.
   *
   * @return {Object}
   */
  static get package () {
    return require('../package.json')
  }

  /**
   * Plugin registration.
   *
   * @param {...Object} options
   */
  static async register (...options) {
    return new Plugin(...options).register()
  }

  /**
   * Plugin as Object.
   *
   * @return {Object}
   */
  static asObject () {
    return { pkg: this.package, register: this.register }
  }

  /**
   * Create a new Plugin instance.
   *
   * @param {Object} server
   * @param {Object} options
   */
  constructor (server, options) {
    this.server = server
    this.options = Joi.attempt(options, this.schema)
  }

  /**
   * Plugin instance registration.
   */
  async register () {
    this.ashe = new Ashe(this)

    this.server.decorate('server', 'ashe', () => this.ashe)
    this.server.decorate('request', 'ashe', () => this.ashe)
  }

  /**
   * Options schema.
   *
   * @return {Object}
   */
  get schema () {
    return Joi.object({
      bcrypt: Joi.object().required().keys({
        rounds: Joi.number().integer().min(8).required()
      }),
      hasher: Joi.object().required().keys({
        secret: Joi.string().min(32).required()
      })
    })
  }
}

module.exports = Plugin
