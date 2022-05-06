import React, { useState } from 'react'
import './style.css'

export interface Props {
  value: number
  idx: number
  rowKey: number
  recreateMatrix: Function
}

const Cell: React.FunctionComponent<Props> = ({ value }) => {
  const [cellValue, setCellValue] = useState<boolean>(Boolean(value))
  const [cellClass, setCellClass] = useState(cellValue ? 'cell cell--alive' : 'cell cell--dead')
  const changeState = (newCellVal: boolean) => {
    setCellValue(newCellVal)
    setCellClass(newCellVal ? 'cell cell--alive' : 'cell cell--dead')
  }
  
  return (
    <td onClick={() => changeState(!cellValue)} className={cellClass}><span>{String(Number(cellValue))}</span></td>
  )
}

export default Cell