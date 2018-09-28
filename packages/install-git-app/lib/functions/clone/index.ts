import temp from 'unique-temp-path'
import { GitClone } from '../../types'
import spawnGit from '../spawn-git'

async function clone (param: string | GitClone.Options): Promise<string> {
  if (typeof param === 'string') return clone({source: param})

  const {
    source,
    branch,
    checkout,
    depth,
    cwd = '/',
    extra = []
  } = param

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
