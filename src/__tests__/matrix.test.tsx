import { makeMatrixRow, makeMatrix } from '../utils/matrix'

describe('Matrix row', () => {
  it("Row width = 1, with one cell", () => {
    const row: number = 1
    const col: number[] = [0]
    const width: number = 1
    expect(makeMatrixRow(row, col, width)).toEqual([1])
  })

  it("Row width = 3, with one cell", () => {
    const row: number= 1
    const col: number[] = [1]
    const width: number = 3
    expect(makeMatrixRow(row, col, width)).toEqual([0, 1, 0])
  })

  it("Row width = 3, with two cells", () => {
    const row: number = 2
    const col: number[] = [1, 2]
    const width: number = 3
    expect(makeMatrixRow(row, col, width)).toEqual([0, 1, 1])
  })
})

describe('Matrix', () => {
  it("Grid 1x1", () => {
    const cols: number[] = [0]
    const rows: number[] = [1]
    expect(makeMatrix(cols, rows)).toEqual([[1]])
  })

  it("Grid 3x3 with 3 cells", () => {
    const cols: number[] = [1, 0, 2]
    const rows: number[] = [1, 1, 1]
    const resultExpected: number[][] = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 1]
    ]
    expect(makeMatrix(cols, rows)).toEqual(resultExpected)
  })

  it("Grid 10x10 with 7 cells", () => {
    const cols: number[] = [1, 0, 1, 6, 8, 3, 9]
    const rows: number[] = [1, 1, 0, 3, 2]
    const resultExpected: number[][] = [
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
    ]
    expect(makeMatrix(cols, rows)).toEqual(resultExpected)
  })

  it("Grid 0x0 with 0 cell", () => {
    const cols: number[] = []
    const rows: number[] = []
    expect(makeMatrix(cols, rows)).toEqual([])
  })
})
