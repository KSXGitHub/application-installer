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
