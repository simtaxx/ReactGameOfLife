import React, { useEffect, useState } from 'react'
import './style.css'

export interface Props {
  value: number
}

const Cell: React.FunctionComponent<Props> = ({ value }) => {
  const [cellValue, setCellValue] = useState<number>(value)
  useEffect(() => {
    setCellValue(value)
  }, [value])
  return (
    <td onClick={() => setCellValue(cellValue === 1 ? 0 : 1)} className={cellValue === 1 ? 'cell cell--alive' : 'cell cell--dead'}><span>{String(cellValue)}</span></td>
  )
}

export default Cell