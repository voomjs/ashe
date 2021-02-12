# @voom/ashe

#### Hashing utilities for [Hapi](https://hapi.dev).

This plugin exposes the following cryptographic algorithms:

- MD5
- SHA1
- SHA256
- SHA512
- Bcrypt

## Installation

```shell script
npm install @voom/ashe
```

## Usage

```js
const Hapi = require('@hapi/hapi')
const Ashe = require('@voom/ashe')

async function start () {
  const server = Hapi.Server()

  await server.register({
    plugin: Ashe,
    options: {
      bcrypt: {
        rounds: 10
      },
      hasher: {
        secret: 'secret'
      }
    }
  })

  await server.start()

  const bcrypt = server.ashe().bcrypt()

  const hash = await bcrypt.make('hello')
  // $2b$10$1sE...

  const valid = await bcrypt.check('hello', hash)
  // true

  const hash = await bcrypt.make('hello', 12)
  // $2b$12$Ijy...

  const valid = await bcrypt.check('hello', hash)
  // true

  const hasher = server.ashe().hasher('sha256')

  const hash = hasher.make('hello')
  // 88aab3ede8...

  const valid = hasher.check('hello', hash)
  // true

  const hash = hasher.make('hello', 'custom-secret')
  // 9023459fc8...

  const valid = hasher.check('hello', hash)
  // false
}

start()
```
