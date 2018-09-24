import * as types from '../../../types'
import SpawnError from '../spawn-error'
import Info = types.Error.CloneError.Info

class CloneError extends SpawnError {
  constructor (info: Info) {
    const signal = info.signal ? ` "${info.signal}"` : ''
    const stderr = info.stderr ? ` ${info.stderr}` : ''
    super(`Failed to clone: [status: ${info.status}${signal}]${stderr}`, info)
  }
}

export = CloneError
