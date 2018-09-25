import { Options as SpawnOptions } from 'advanced-spawn-async'

export interface Param {
  readonly repo: string
  readonly destination: string
  readonly path?: string
  readonly install?: InstallFunc
}

export interface InstallFunc {
  (param: InstallFunc.Param): void | Promise<void>
}

export namespace InstallFunc {
  export interface Param {
    readonly repo: string
    readonly path: string
    readonly localRepo: string
    readonly localPath: string
    readonly destination: string
  }
}

export namespace Error {
  export namespace SpawnError {
    export interface Info {
      readonly stdout: string
      readonly stderr: string
      readonly status: number
      readonly signal: string | null
    }
  }

  export namespace CloneError {
    export interface Info extends SpawnError.Info {}
  }
}

export namespace SpawnGit {
  export interface Options extends SpawnOptions {
    readonly cwd: string
  }
}
