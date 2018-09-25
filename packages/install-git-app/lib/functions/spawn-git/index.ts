import spawn from 'advanced-spawn-async'
import { SpawnGit } from '../../types'

export = (
  argv: string[],
  options: string | SpawnGit.Options
) => spawn(
  'git',
  argv,
  typeof options === 'string'
    ? { cwd: options, event: 'close' }
    : { event: 'close', ...options }
)
