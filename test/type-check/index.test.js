'use strict'
const cmd = require('test-spawn.tool')

it('TypeScript: Type Check', () => {
  cmd({
    defaultExecutable: 'node',
    argvPrefix: [
      require.resolve('typescript/bin/tsc'),
      '--noEmit'
    ],
    envMiddleName: 'STANDARDJS'
  })
})
