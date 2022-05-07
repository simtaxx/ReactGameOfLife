import React, { useState, useRef, useEffect } from 'react';
import Cell from '../cell';
import { makeMatrix, playGameOfLife } from '../../utils/matrix'


export interface Props {}

const Grid: React.FunctionComponent<Props> = () => {
  const cols: number[] = [1, 0, 1, 6, 8, 3, 9]
  const rows: number[] = [1, 1, 0, 3, 2]
  const [matrix, setMatrix] = useState(() => makeMatrix(cols, rows))
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
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
      setMatrix([...makeMatrix(newCols, newRows)])
      console.log(matrix)
      if (!isPlaying) {
        setIsPlaying(true)
      }
    }
  }

  const play = () => {
    setTimeout(() => {
      setMatrix([...playGameOfLife(matrix)])
      console.log(matrix)
    }, 2000);
  }

  // Used to refresh the matrix
  /* useEffect(() => {
    if (isPlaying) {
      play()
    }
    console.log(matrix)
  }, [matrix]);
 */
  // Used to refresh the isPlaying state
  useEffect(() => {
    console.log("mis a jour playing")
    console.log(isPlaying)
  }, [isPlaying]);

  return (
    <div>
      <button onClick={recreateMatrix}>LANCE LE JEU</button>
      <button onClick={() => setIsPlaying(false)}>STOP</button>
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