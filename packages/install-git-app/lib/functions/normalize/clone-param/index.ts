import { GitClone } from '../../../types'

export =
  (param: GitClone.Param): GitClone.Options =>
    typeof param === 'string' ? { source: param } : param
