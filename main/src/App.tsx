import Cell from "./components/Cell"
import "./App.css"
import { useEffect, useState } from "react";

function App() {

  const DIM = {
    x: 12,
    y: 12
  }; //x by y
  const currentGen: number[][] = [];
  
  for (let i = 0; i < DIM.x; i++) {
    currentGen[i] = [];
    for (let j = 0; j < DIM.y; j++) {
      currentGen[i][j] = 0
    }
  }
  const [cellSize,setCellSize] = useState(Math.floor(Math.min(window.innerHeight/DIM.y, window.innerWidth/DIM.x)))

  useEffect(()=>{
    setCellSize(Math.floor(Math.min(window.innerHeight/DIM.y, window.innerWidth/DIM.x)))
    console.log(cellSize)
  },[window.innerHeight,window.innerWidth])

  const gridSize = {
    gridTemplateColumns:`repeat(${DIM.x}, 1fr)`,
    gridTemplateRows:`repeat(${DIM.y}, 1fr)`,
  }

console.log(window.innerHeight,window.innerWidth, cellSize)
  return (
    <div className="flex justify-center">
      <div className="w-[] justify-center custom_grid" style={gridSize}>
        {[...Array(DIM.x * DIM.y)].map((_, index) => {
          return (
            <Cell key={index} size={cellSize}>{index}</Cell>
          )
        })}

      </div>
    </div>
  )
}

export default App
