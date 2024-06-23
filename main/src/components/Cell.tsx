import { useEffect, useState, memo } from "react";

interface CellProps {
    children: React.ReactNode; // Adjusted to use React.ReactNode for children
    size:number
    updateCellState: any
    id:number[]
    alive:number
  }

const Cell: React.FC<CellProps> = memo(({children, size:cellSize ,updateCellState, id, alive}) => {

  useEffect(() => {
    console.log(`Child (${id}) rendered`);
  });

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };
  return (
    <div onClick={()=>updateCellState(id)} style={cellStyle} className={`${alive? "bg-slate-400":"bg-black" }`}>{children}</div>
  )
});

export default Cell