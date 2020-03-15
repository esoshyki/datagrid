import React, {useRef, useEffect} from 'react';

import { BoolCell, DateCell, Cell} from './cells';

export default function _Row ({cols, selectedRows, index, style, handleRowClick, renderedData}) {
  const rowRef = useRef();

  useEffect(() => {
    const idx = rowRef.current.id.replace('row','');
    if (selectedRows.includes(idx)) {
      rowRef.current.classList.add('selected')
    }
  },[])

  return (
    <div key={'row' + index}
    ref={rowRef}
    style={style} 
    className= {selectedRows.includes(index.toString()) ? 'row selected' : 'row'}
    onClick={handleRowClick} 
    id={`row${index}`}>
      {cols.map((colData) => {
        const rowData =  renderedData[index];
        const innerInfo= rowData[colData.dataKey]
        const idx = colData.id
        switch(idx) {
          case 6:
            return <BoolCell innerInfo={innerInfo} rowId={index} colId={idx} />
          case 7:
            return <DateCell innerInfo={innerInfo} rowId={index} colId={idx} />
          default:
            return <Cell innerInfo={innerInfo} rowId={index} colId={idx} />
        }
      })}
  </div>
  )
}

