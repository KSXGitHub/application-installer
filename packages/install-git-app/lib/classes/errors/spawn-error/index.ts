import * as types from '../../../types'
import Info = types.Error.SpawnError.Info

class SpawnError extends Error {
  readonly info: Info

  constructor (message: string, info: Info) {
    super(message)
    this.info = info
  }
}

export = SpawnError
