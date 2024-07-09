import Cell from "../Cell"
import { useCallback, useEffect, useRef, useState } from "react";
import calculateNextGen from "../calculateNextGen";
import includesArray from "../includesArray"

type Props = {
  pattern:string
}

const shapes = {
  "Pulsar":[
    [0, 0], [1, 0], [2, 0], [6, 0], [7, 0], [8, 0],
    [-2, 2], [3, 2], [5, 2], [10, 2],
    [-2, 3], [3, 3], [5, 3], [10, 3],
    [-2, 4], [3, 4], [5, 4], [10, 4],
    [0, 5], [1, 5], [2, 5], [6, 5], [7, 5], [8, 5],
    [0, 7], [1, 7], [2, 7], [6, 7], [7, 7], [8, 7],
    [-2, 8], [3, 8], [5, 8], [10, 8],
    [-2, 9], [3, 9], [5, 9], [10, 9],
    [-2, 10], [3, 10], [5, 10], [10, 10],
    [0, 12], [1, 12], [2, 12], [6, 12], [7, 12], [8, 12]
  ],
  "Beacon":[
    [0, 0], [1, 0],
    [0, 1], [1, 1],
    [2, 2], [3, 2],
    [2, 3], [3, 3]
  ],
  "Pentad": [
    [0, 0],
    [0, 1],
    [-1, 2], [1, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [-1, 7], [1, 7],
    [0, 8],
    [0, 9]
  ],
  "": []
}

function GameGrid({pattern}: Props) {
  //Grid dimension and cell size
  console.log("GameGrid rendered");
  const DIM = {
    x: 200,
    y: 200,
  }; //x by y
  const [cellSize, setCellSize] = useState(
    Math.floor(Math.min(window.innerHeight / DIM.y, window.innerWidth / DIM.x))
  );

  const gridSize = {
    gridTemplateColumns: `repeat(${DIM.x}, 1fr)`,
    gridTemplateRows: `repeat(${DIM.y}, 1fr)`,
  };

  useEffect(() => {
    setCellSize(
      Math.floor(
        Math.min(window.innerHeight / DIM.y, window.innerWidth / DIM.x)
      )
    );
  }, [window.innerHeight, window.innerWidth]);

  //Current gen 2D array-state
  const [currentGen, setCurrentGen] = useState([]);

  //Fill current gen with random
  useEffect(() => {
    const tempArray: number[][] = [[]];
    for (let i = 0; i < DIM.x; i++) {
      tempArray[i] = [];
      for (let j = 0; j < DIM.y; j++) {
        tempArray[i][j] = 0; //Math.round(Math.random())
      }
    }
    setCurrentGen(tempArray);
  }, []);

  // OnClick change state of a cell
  const handleClick = useCallback((cellID: string) => {
    setCurrentGen((currentGen) => {
      let tempArr: number[][] = structuredClone(currentGen);
      hoveredRef.current.map((item: string) => {
        let [x, y] = item.split(";");
        tempArr[y][x] = +!currentGen[y][x];
      });
      return tempArr;
    });
  }, []);

  //OnHover add to hover array and render all
  const [hovered, setHovered] = useState([]);
  const hoveredRef = useRef(hovered);
  useEffect(()=>{
    hoveredRef.current = hovered
  },[hovered]);

  const patternRef = useRef(pattern);
  useEffect(()=>{
    patternRef.current = pattern
  },[pattern]);


  const hoverIn = useCallback((id: string) => {
    console.log(pattern)
    setHovered((oldHovered) => {
      const [x, y] = id.split(";").map(Number);
      const newHovered = [...oldHovered,id];
      shapes[patternRef.current].map( (item)=>{
        newHovered.push(`${x+item[0]};${y+item[1]}`)
      } )
      return newHovered;
    });
  }, []);

  const hoverOut = useCallback(() => {
    setHovered([]);
  }, []);

  function render(): void {
    setCurrentGen(calculateNextGen(currentGen));
  }

  return (
    <div className="flex justify-center">
      <div className="w-[] justify-center custom_grid" style={gridSize}>
        {currentGen.map((column: number[], y: number) => {
          return column.map((item: number, x: number) => {
            return (
              <Cell
                key={x + y * DIM.y}
                size={cellSize}
                updateCellState={handleClick}
                id={x + ";" + y}
                alive={item}
                addHover={hoverIn}
                removeHover={hoverOut}
                hovered={hovered.includes(x + ";" + y)}
              ></Cell>
            );
          });
        })}
      </div>
      <button onClick={() => render()}>Next gen</button>
    </div>
  );
}

export default GameGrid