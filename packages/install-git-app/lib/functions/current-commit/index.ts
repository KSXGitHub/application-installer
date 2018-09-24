import { spawn } from 'child_process'
import { SpawnError } from '../../classes'

function getCurrentCommit (
  directory: string,
  reference: string = 'master'
): Promise<string> {
  const child = spawn('git', ['rev-parse', reference], { cwd: directory })
  let stdout = ''
  let stderr = ''
  child.stdout.on('data', chunk => { stdout += chunk })
  child.stderr.on('data', chunk => { stderr += chunk })

  return new Promise((resolve, reject) => {
    child.on('close', (status, signal) => {
      if (status) {
        reject(new SpawnError(
          `Failed to execute "git rev-parse ${reference}" on directory ${JSON.parse(directory)}`,
          {
            stdout,
            stderr,
            status,
            signal
          }
        ))
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

export = getCurrentCommit
