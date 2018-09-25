import temp from 'unique-temp-path'
import spawnGit from '../spawn-git'

async function clone (source: string): Promise<string> {
  const destination = temp('install-git-app.')
  await spawnGit(['clone', source, destination], '/').onclose
  return destination
}

export = clone
