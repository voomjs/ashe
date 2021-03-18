const Bcrypt = require('./bcrypt')
const Hasher = require('./hasher')

class Ashe {
  /**
   * Create a new Ashe instance.
   *
   * @param {Object} options
   */
  constructor (options) {
    this.options = options
  }

  /**
   * Create a new Bcrypt instance.
   *
   * @return {Bcrypt}
   */
  bcrypt () {
    return new Bcrypt(this.options.bcrypt)
  }

  /**
   * Create a new Hasher instance.
   *
   * @param {String} method
   * @return {Hasher}
   */
  hasher (method) {
    return new Hasher(method, this.options.hasher)
  }
}

module.exports = Ashe
