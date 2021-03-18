const bcrypt = require('bcrypt')

class Bcrypt {
  /**
   * Create a new Bcrypt instance.
   *
   * @param {Number} rounds
   */
  constructor ({ rounds }) {
    this.rounds = rounds
  }

  /**
   * Hash the given data.
   *
   * @param {String} data
   * @param {Number} [rounds]
   * @return {String}
   */
  async make (data, rounds = this.rounds) {
    return bcrypt.hash(data, rounds)
  }

  /**
   * Check the given plain data against the hash.
   *
   * @param {String} data
   * @param {String} hash
   * @return {Boolean}
   */
  async check (data, hash) {
    return bcrypt.compare(data, hash)
  }
}

module.exports = Bcrypt
