import { spawn } from 'child_process'
import temp from 'unique-temp-path'

function clone (source: string): Promise<string> {
  const destination = temp('install-git-app.')
  const child = spawn('git', ['clone', source, destination])

  let stdout = ''
  let stderr = ''

  child.stdout.on('data', chunk => { stdout += String(chunk) })
  child.stderr.on('data', chunk => { stderr += String(chunk) })

  return new Promise((resolve, reject) => {
    child.on('close', (status, signal) => {
      if (status) {
        reject(new clone.CloneError({
          stdout,
          stderr,
          status,
          signal
        }))
      } else {
        resolve(destination)
      }
    })
  })
}

namespace clone {
  export class CloneError extends Error {
    readonly info: CloneError.Info

    constructor (info: CloneError.Info) {
      const signal = info.signal ? ` "${info.signal}"` : ''
      const stderr = info.stderr ? ` ${info.stderr}` : ''
      super(`Failed to clone: [status: ${info.status}${signal}]${stderr}`)
      this.info = info
    }
  }

  export namespace CloneError {
    export interface Info {
      readonly stdout: string
      readonly stderr: string
      readonly status: number
      readonly signal: string | null
    }
  }
}

export = clone
