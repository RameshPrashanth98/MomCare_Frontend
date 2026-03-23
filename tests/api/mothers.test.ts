import { describe, it, expect } from 'vitest'
import { listMothers, getMother } from '@/lib/api/mothers'

describe('lib/api/mothers', () => {
  it('listMothers returns typed data with data array', async () => {
    const result = await listMothers()
    expect(result).toHaveProperty('data')
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.data.length).toBeGreaterThan(0)
    expect(result.data[0]).toHaveProperty('id')
    expect(result.data[0]).toHaveProperty('name')
    expect(result.data[0]).toHaveProperty('riskLevel')
    expect(result.data[0]).toHaveProperty('lmpDate')
  })

  it('getMother returns a single mother by id', async () => {
    const list = await listMothers()
    const firstId = list.data[0].id
    const mother = await getMother(firstId)
    expect(mother.id).toBe(firstId)
    expect(mother).toHaveProperty('name')
    expect(mother).toHaveProperty('riskLevel')
  })

  it('getMother throws for non-existent id', async () => {
    await expect(getMother('non-existent-id')).rejects.toThrow()
  })
})
