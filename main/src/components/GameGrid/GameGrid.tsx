import Cell from "../Cell"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import calculateNextGen from "../calculateNextGen";
import {shapes} from "../../assets/patternList.ts"

type Props = {
  pattern:string
}

export type GameGridHandle = {
  renderStep: () => void;
  clearGrid: () => void;
};

function GameGrid({pattern}: Props, ref:React.Ref<GameGridHandle>) {
  //Grid dimension and cell size
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
  const [currentGen, setCurrentGen] = useState<number[][]>([]);

  //Fill current gen with random
  useEffect(() => {
    resetGrid();
  }, []);

  function resetGrid(){
    const tempArray: number[][] = [[]];
    for (let i = 0; i < DIM.x; i++) {
      tempArray[i] = [];
      for (let j = 0; j < DIM.y; j++) {
        tempArray[i][j] = 0; //Math.round(Math.random())
      }
    }
    setCurrentGen(tempArray);
  }

  // OnClick change state of a cell
  const handleClick = useCallback(() => {
    
    setCurrentGen((currentGen) => {
      let tempArr: number[][] = structuredClone(currentGen);
      hoveredRef.current.map((item: string) => {
        let [x, y] = item.split(";").map(Number);
        if ( (x <= DIM.x - 1) && (y <= DIM.y-1) && (x >= 0) && (y >= 0)){
          tempArr[y][x] = +!currentGen[y][x];
        }
      });
      return tempArr;
    });
  }, []);

  //OnHover add to hover array and render all
  const [hovered, setHovered] = useState<string[]>([]);
  const hoveredRef = useRef(hovered);
  useEffect(()=>{
    hoveredRef.current = hovered
  },[hovered]);

  const patternRef = useRef(pattern);
  useEffect(()=>{
    patternRef.current = pattern
  },[pattern]);


  const hoverIn = useCallback((id: string) => {
    setHovered(() => {
      const [x, y] = id.split(";").map(Number);
      const newHovered = [id];
      shapes[patternRef.current]?.map( (item)=>{
        newHovered.push(`${x+item[0]};${y+item[1]}`)
      } )
      return newHovered;
    });
  }, []);

  const hoverOut = useCallback(() => {
    setHovered([]);
  }, []);

  function render(): void {
    setCurrentGen((currentGen) => calculateNextGen(currentGen));
  }

  useImperativeHandle(ref, ()=>{
    return {renderStep: render,
            clearGrid: resetGrid
     }
  },[])

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
    </div>
  );
}

export default forwardRef(GameGrid)