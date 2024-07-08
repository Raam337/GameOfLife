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

    useEffect(() => {
      console.log('Cell component mounted');
    }, []);

    useEffect(() => {
      console.log('children prop changed');
    }, [children]);

    useEffect(() => {
      console.log('size prop changed');
    }, [cellSize]);

    useEffect(() => {
      console.log('updateCellState prop changed');
    }, [updateCellState]);

    useEffect(() => {
      console.log('id prop changed');
    }, [id]);

    useEffect(() => {
      console.log('alive prop changed');
    }, [alive]);

    useEffect(() => {
      console.log('hovered prop changed');
    }, [hovered]);

    useEffect(() => {
      console.log('addHover prop changed');
    }, [addHover]);

    useEffect(() => {
      console.log('removeHover prop changed');
    }, [removeHover]);










    const cellStyle = {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
    };
    //console.log("rerender " + id)
    return (
      <div
        onMouseEnter={() => addHover(id)}
        onMouseLeave={() => removeHover()}
        onClick={() => updateCellState(id)}
        style={cellStyle}
        className={`${
          hovered ? "bg-red-500" : alive ? "bg-slate-400" : "bg-black"
        }`}
      >
        {children}
      </div>
    );
  }
);

export default Cell