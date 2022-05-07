/* const cols = [1, 0, 1, 6, 8, 3, 9]
const rows = [1, 1, 0, 3, 2] */

export const makeMatrixRow = (row: number, cols: number[], width: number): number[] => {
  const matrixRow: number[] = Array(width).fill(0)
  for (let i = 0; i < row; i++) {
    matrixRow[cols[0 + i]] = 1
  }
  return matrixRow
}

export const makeMatrix = (cols: number[], rows: number[]): number[][] => {
  let width: number = Math.max(...cols) + 1
  const matrix: number[][] = []
  if (width > rows.length) {
    rows = [...rows, ...Array(width - rows.length)]
  } else if (width < rows.length) {
    width += rows.length - width
  }
  rows.forEach((row) => {
    matrix.push(makeMatrixRow(row, cols, width))
    cols.splice(0, row)
  })
  return matrix
}

export const playGameOfLife = (matrix: number[][]) => {
  const newMatrix: number[][] = []
  matrix.forEach((row, rowIdx) => {
    const newRow: number[] = []
    row.forEach((cell, cellIdx) => {
      let newCell: number = cell
      const countOfNeighbor = neighborCount(matrix, rowIdx, cellIdx)
      if (!cell) {
        if (countOfNeighbor === 3) newCell = 1
      } else {
        if (countOfNeighbor < 2 || countOfNeighbor > 3) newCell = 0
      }
      newRow.push(newCell)
    })
    newMatrix.push(newRow)
  })
  return newMatrix
}

export const neighborCount = (matrix: number[][], rowIdx: number, cellIdx: number): number => {
  const previousRow = matrix[rowIdx - 1]
  const currentRow = matrix[rowIdx]
  const nextRow = matrix[rowIdx + 1]
  
  const leftCellIdx = cellIdx - 1
  const rightCellIdx = cellIdx + 1

  return [
    ...previousRow ? [
      previousRow[leftCellIdx],
      previousRow[cellIdx],
      previousRow[rightCellIdx]
    ] : [],
    currentRow[leftCellIdx],
    currentRow[rightCellIdx],
    ...nextRow ? [
      nextRow[leftCellIdx],
      nextRow[cellIdx],
      nextRow[rightCellIdx]
    ] : []
  ].filter(item => item === 1).length
}

/* console.table(makeMatrix(cols, rows)) */
