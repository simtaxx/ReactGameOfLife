import React, { useState, useRef, useEffect } from 'react';
import Cell from '../cell';
import { makeMatrix } from '../../utils/matrix'


export interface Props {}

const Grid: React.FunctionComponent<Props> = () => {
  const cols: number[] = [1, 0, 1, 6, 8, 3, 9]
  const rows: number[] = [1, 1, 0, 3, 2]
  const [matrix, setMatrix] = useState(() => makeMatrix(cols, rows))
  const gridRef = useRef<HTMLTableSectionElement>(null)
  const recreateMatrix = (): void => {
    if (gridRef.current) {
      const gridRows = gridRef.current.childNodes
      const newRows: number[] = []
      const newCols: number[] = []
      gridRows.forEach((row) => {
        let alivePerRowCounter = 0
        row.childNodes.forEach((cell, idxCell) => {
          if (cell.textContent === '1') {
            alivePerRowCounter++
            newCols.push(idxCell)
          }
        })
        newRows.push(alivePerRowCounter)
      })
      setMatrix(makeMatrix(newCols, newRows))
    }
  }

  useEffect(() => {}, [matrix]);

  return (
    <div>
      <button onClick={recreateMatrix}>RECREATE MATRIX</button>
      <table>
        <tbody ref={gridRef}>
          {matrix.map((row, idxRow) => {
            return (
              <tr key={idxRow}>
                {row.map((col, idxCol) => {
                  return (
                    <Cell key={idxCol} value={col} idx={idxCol} rowKey={idxRow} recreateMatrix={recreateMatrix}></Cell>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;