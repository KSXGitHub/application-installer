import temp from 'unique-temp-path'
import { GitClone } from '../../types'
import spawnGit from '../spawn-git'
import { normalizeCloneParam } from '../normalize'

async function clone (param: GitClone.Param): Promise<string> {
  const {
    source,
    branch,
    checkout,
    depth,
    cwd = '/',
    extra = []
  } = normalizeCloneParam(param)

  const destination = temp('install-git-app.')

  const argv = [
    'clone',
    source,
    destination,
    ...branch ? ['--branch', branch] : [],
    ...typeof depth === 'number' ? ['--depth', String(depth)] : [],
    ...extra
  ]

  await spawnGit(argv, cwd).onclose

  if (checkout) {
    await spawnGit(['checkout', checkout], destination)
  }

  return destination
}

export = clone
