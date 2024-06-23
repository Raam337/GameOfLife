import Cell from "./components/Cell"
import "./App.css"
import { useEffect, useState } from "react";
import calculateNextGen from "./components/calculateNextGen";

function App() {
  const DIM = {
    x: 100,
    y: 100
  }; //x by y

  const [currentGen, setCurrentGen] = useState([])

  useEffect(()=>{
   const tempArray: number[][] = [[]];
  
  for (let i = 0; i < DIM.x; i++) {
    tempArray[i] = [];
    for (let j = 0; j < DIM.y; j++) {
      tempArray[i][j] = 0
    }
  }
    setCurrentGen(tempArray);
  },[])

  const [cellSize,setCellSize] = useState(Math.floor(Math.min(window.innerHeight/DIM.y, window.innerWidth/DIM.x)));
  

  useEffect(()=>{
    setCellSize(Math.floor(Math.min(window.innerHeight/DIM.y, window.innerWidth/DIM.x)))
  },[window.innerHeight,window.innerWidth])

  const gridSize = {
    gridTemplateColumns:`repeat(${DIM.x}, 1fr)`,
    gridTemplateRows:`repeat(${DIM.y}, 1fr)`,
  }

  function handleClick(cellID:number[]){
    let [x,y] = cellID
    let tempArr:number[][] = structuredClone(currentGen);
    tempArr[y][x] = +!currentGen[y][x];
    setCurrentGen(tempArr);
    console.log(currentGen);
  }

  function render():void{
    setCurrentGen(calculateNextGen(currentGen))
  }

  return (
    <div className="flex justify-center">
      <div className="w-[] justify-center custom_grid" style={gridSize}>
        {/* {[...Array(DIM.x * DIM.y)].map((_, index) => {
          return (
            <Cell key={index} size={cellSize} onClick={handleClick} id={index}>{index}</Cell>
          )
        })} */}

      {currentGen.map((column:number[],y:number)=>{
        return(
        column.map((item:number,x:number)=>{
          return(
          <Cell key={x+y*DIM.y} size={cellSize} updateCellState={handleClick} id={[x,y]} alive={item}></Cell>
        )}))
      })}




      </div>
      <button onClick={() => render()}>Next gen</button>
    </div>
  )
}



export default App
