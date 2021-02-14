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
    const { bcrypt } = this.options

    return new Bcrypt(bcrypt.rounds)
  }

  /**
   * Create a new Hasher instance.
   *
   * @param {String} algo
   * @return {Hasher}
   */
  hasher (algo) {
    const { hasher } = this.options

    return new Hasher(algo, hasher.secret)
  }
}

module.exports = Ashe
