import { describe, expect, it } from 'vitest'
import { capitalize, toHump, toLine } from '@/utils'

describe('utils', () => {
  it('toLine', () => {
    expect(toLine('camelCase')).toEqual('camel-case')
  })
  it('toHump', () => {
    expect(toHump('camel-case')).toEqual('camelCase')
  })
  it('firstUpper', () => {
    expect(capitalize('firstUpper')).toEqual('FirstUpper')
  })
})
