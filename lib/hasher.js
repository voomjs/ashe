const crypto = require('crypto')

class Hasher {
  /**
   * Create a new Hasher instance.
   *
   * @param {String} algo
   * @param {String} secret
   */
  constructor (algo, secret) {
    this.algo = algo
    this.secret = secret
  }

  /**
   * Hash the given data.
   *
   * @param {String} data
   * @param {String} [secret]
   * @return {String}
   */
  make (data, secret = this.secret) {
    return crypto.createHmac(this.algo, secret).update(data).digest('hex')
  }

  /**
   * Check the given plain data against the hash.
   *
   * @param {String} data
   * @param {String} hash
   * @return {boolean}
   */
  check (data, hash) {
    return this.make(data) === hash
  }
}

module.exports = Hasher
