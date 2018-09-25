import spawnGit from '../spawn-git'

async function getCurrentCommit (
  directory: string,
  reference: string = 'master'
): Promise<string> {
  const { stdout } = await spawnGit(['rev-parse', reference], directory).onclose
  return stdout.trim()
}

export = getCurrentCommit
