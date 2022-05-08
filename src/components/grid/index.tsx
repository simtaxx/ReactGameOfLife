import React, { useState, useRef } from 'react';
import Cell from '../cell';
import { makeMatrix, playGameOfLife } from '../../utils/matrix'


export interface Props {}

const Grid: React.FunctionComponent<Props> = () => {
  const cols: number[] = [15]
  const rows: number[] = [0]
  const [matrix, setMatrix] = useState(() => makeMatrix(cols, rows))
  const [lapCount, setLapCount] = useState<number>(0)
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
      playNextStep(makeMatrix(newCols, newRows))
    }
  }

  const playNextStep = (newMatrix: number[][]) => {
    setLapCount(lap => lap + 1)
    setMatrix([...playGameOfLife(newMatrix)])
  }

  return (
    <div>
      <button onClick={recreateMatrix}>Avancer d'un tour</button>
      <p>{`${lapCount} tour(s) passé(s)`}</p>
      <table>
        <tbody ref={gridRef}>
          {matrix.map((row, idxRow) => {
            return (
              <tr key={idxRow}>
                {row.map((col, idxCol) => {
                  return (
                    <Cell key={idxCol} value={col}></Cell>
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