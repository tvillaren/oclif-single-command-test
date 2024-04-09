import {run, ux} from '@oclif/core'
import {expect} from 'chai'
import * as path from 'node:path'
import url from 'node:url'
import {SinonSandbox, SinonStub, createSandbox} from 'sinon'

describe('single command cli', () => {
  let sandbox: SinonSandbox
  let stdoutStub: SinonStub

  beforeEach(() => {
    sandbox = createSandbox()
    stdoutStub = sandbox.stub(ux.write, 'stdout')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should run command', async () => {
    await run(['hello', '--from=oclif'], path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'package.json'))
    expect(stdoutStub.firstCall.firstArg).to.equal('hello hello from oclif! (./src/commands/hello/index.ts)\n')
  })
})
