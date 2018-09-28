import path from 'path'
import { copy, remove } from 'fs-extra'
import { Param } from '../../types'
import clone from '../clone'

async function install (param: Param): Promise<void> {
  const {
    destination,
    repo,
    install = () => undefined,
    path: subpath = '.'
  } = param

  const [
    cloneReturn
  ] = await Promise.all([
    clone(repo),
    remove(destination)
  ])

  const localPath = path.resolve(cloneReturn.destination, subpath)
  await copy(localPath, destination)

  await install({
    destination,
    path: subpath,
    clone: cloneReturn
  })

  await remove(cloneReturn.destination)
}

export = install
