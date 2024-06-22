import { useState } from "react";

interface CellProps {
    children: React.ReactNode; // Adjusted to use React.ReactNode for children
    size:number
  }

function Cell({children, size:cellSize}:CellProps) {
  const [state, setState] = useState(false);

  const clickHandle = () => {
    setState(!state);
  }

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };
  return (
    <div onClick={clickHandle} style={cellStyle} className={`${state? "bg-slate-400":"bg-black" }`}>{children}</div>
  )
}

export default Cell