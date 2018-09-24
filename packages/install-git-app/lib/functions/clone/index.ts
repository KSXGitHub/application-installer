import { spawn } from 'child_process'
import temp from 'unique-temp-path'
import { CloneError } from '../../classes'

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
        reject(new CloneError({
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

export = clone
