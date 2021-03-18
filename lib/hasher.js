const crypto = require('crypto')

class Hasher {
  /**
   * Create a new Hasher instance.
   *
   * @param {String} method
   * @param {String} secret
   */
  constructor (method, { secret }) {
    this.method = method
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
    return crypto.createHmac(this.method, secret).update(data).digest('hex')
  }

  /**
   * Check the given plain data against the hash.
   *
   * @param {String} data
   * @param {String} hash
   * @return {Boolean}
   */
  check (data, hash) {
    return this.make(data) === hash
  }
}

module.exports = Hasher
