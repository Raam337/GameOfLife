import { useEffect, useState, memo } from "react";

interface CellProps {
    children: React.ReactNode; // Adjusted to use React.ReactNode for children
    size:number
    updateCellState: any
    id:string
    alive:number
    hovered:boolean
    addHover: Function
    removeHover:Function
  }

const Cell: React.FC<CellProps> = memo(
  ({ children, size: cellSize, updateCellState, id, alive, hovered, addHover, removeHover }) => {

    const cellStyle = {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
    };
    
    return (
      <div
        onMouseEnter={() => addHover(id)}
        onMouseLeave={() => removeHover()}
        onClick={() => updateCellState(id)}
        style={cellStyle}
        className={`${
          hovered ? "bg-red-500" : alive ? "bg-slate-400" : "bg-black"
        } text-[8px]`}
      >
        {children}

      </div>
    );
  }
);

export default Cell