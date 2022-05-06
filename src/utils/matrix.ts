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

/* console.table(makeMatrix(cols, rows)) */
