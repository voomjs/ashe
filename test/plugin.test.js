const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const Hapi = require('@hapi/hapi')

const Plugin = require('../lib')

const { expect } = Code
const { describe, it } = exports.lab = Lab.script()

const defaults = {
  bcrypt: {
    rounds: 10
  },
  hasher: {
    secret: '12345678'.repeat(4)
  }
}

async function withServer (options) {
  const server = Hapi.Server()

  await server.register({
    plugin: Plugin,
    options: Object.assign({}, defaults, options)
  })

  return server
}

describe('plugin', function () {
  it('throws an error when options are missing', async function () {
    const server = Hapi.Server()

    await expect(server.register(Plugin)).to.reject()
  })

  it('exposes ashe instance', async function () {
    const server = await withServer()

    expect(server.ashe).to.be.a.function()

    server.route({
      method: 'GET',
      path: '/plugin',
      handler (request, h) {
        expect(request.ashe).to.be.a.function()
        expect(request.ashe()).to.be.equal(server.ashe())

        return h.response().code(200)
      }
    })

    const res = await server.inject('/plugin')

    expect(res.statusCode).to.be.equal(200)
  })

  it('encrypts data using bcrypt', async function () {
    const server = await withServer()

    const bcrypt = server.ashe().bcrypt()

    expect(bcrypt).to.be.an.object()

    const data = 'hello'
    const hash = await bcrypt.make(data)

    expect(hash).to.be.a.string()

    expect(await bcrypt.check(data, hash)).to.be.true()
    expect(await bcrypt.check(data, 'fail')).to.be.false()
  })

  it('encrypts data using bcrypt and custom rounds', async function () {
    const server = await withServer()

    const bcrypt = server.ashe().bcrypt()

    expect(bcrypt).to.be.an.object()

    const data = 'hello'
    const hash = await bcrypt.make(data, 12)

    expect(hash).to.be.a.string()

    expect(await bcrypt.check(data, hash)).to.be.true()
  })

  it('encrypts data using sha256', async function () {
    const server = await withServer()

    const hasher = server.ashe().hasher('sha256')

    expect(hasher).to.be.an.object()

    const data = 'hello'
    const hash = hasher.make(data)

    expect(hash).to.be.a.string()

    expect(hasher.check(data, hash)).to.be.true()
    expect(hasher.check(data, 'fail')).to.be.false()
  })

  it('encrypts data using sha256 and custom secret', async function () {
    const server = await withServer()

    const hasher = server.ashe().hasher('sha256')

    expect(hasher).to.be.an.object()

    const data = 'hello'
    const hash = hasher.make(data, 'secret')

    expect(hash).to.be.a.string()

    expect(hasher.check(data, hash)).to.be.false()
  })
})
