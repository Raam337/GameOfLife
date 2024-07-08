import Cell from "../Cell"
import { useCallback, useEffect, useRef, useState } from "react";
import calculateNextGen from "../calculateNextGen";
import includesArray from "../includesArray"

type Props = {}

function GameGrid({}: Props) {
  //Grid dimension and cell size
  console.log("GameGrid rendered");
  const DIM = {
    x: 50,
    y: 50,
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
  },[hovered])

  const hoverIn = useCallback((id: string) => {
    setHovered((oldHovered) => {
      const [x, y] = id.split(";").map(Number);
      const newHovered = [...oldHovered, id, `${x + 2};${y + 2}`];
      console.log(newHovered);
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