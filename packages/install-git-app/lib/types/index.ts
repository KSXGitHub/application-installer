import { Options as SpawnOptions } from 'advanced-spawn-async'

export interface Param {
  readonly repo: string | GitClone.Options
  readonly destination: string
  readonly path?: string
  readonly install?: InstallFunc
}

export interface InstallFunc {
  (param: InstallFunc.Param): void | Promise<void>
}

export namespace InstallFunc {
  export interface Param {
    readonly clone: Param.Repo
    readonly path: string
    readonly destination: string
  }

  export namespace Param {
    export type Repo = GitClone.Return
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

export namespace GitClone {
  export type Param = string | Options

  export interface Options {
    readonly source: string
    readonly depth?: number
    readonly branch?: string
    readonly checkout?: string
    readonly cwd?: string
    readonly extra?: string[]
  }

  export interface Return extends Options {
    readonly destination: string
    readonly ref: string
    readonly cwd: string
    readonly extra: string[]
  }
}
