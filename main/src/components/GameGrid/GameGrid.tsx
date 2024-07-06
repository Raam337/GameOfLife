import Cell from "../Cell"
import { useEffect, useState } from "react";
import calculateNextGen from "../calculateNextGen";

type Props = {}

function GameGrid({}: Props) {
//Grid dimension and cell size
    const DIM = {
        x: 200,
        y: 100
    }; //x by y
    const [cellSize, setCellSize] = useState(Math.floor(Math.min(window.innerHeight / DIM.y, window.innerWidth / DIM.x)));

    useEffect(() => {
        setCellSize(Math.floor(Math.min(window.innerHeight / DIM.y, window.innerWidth / DIM.x)))

    const gridSize = {
            gridTemplateColumns: `repeat(${DIM.x}, 1fr)`,
            gridTemplateRows: `repeat(${DIM.y}, 1fr)`,
        }
    }, [window.innerHeight, window.innerWidth])

//Current gen 2D array-state
    const [currentGen, setCurrentGen] = useState([]);

//Fill current gen with random
    useEffect(() => {
        const tempArray: number[][] = [[]];
        for (let i = 0; i < DIM.x; i++) {
            tempArray[i] = [];
            for (let j = 0; j < DIM.y; j++) {
                tempArray[i][j] = Math.round(Math.random())
            }
        }
        setCurrentGen(tempArray);
    }, [])

// OnClick change state of a cell
    function handleClick(cellID: number[]) {
        let [x, y] = cellID
        let tempArr: number[][] = structuredClone(currentGen);
        tempArr[y][x] = +!currentGen[y][x];
        setCurrentGen(tempArr);
        console.log(currentGen);
    }

//OnHover add to hover array and render all


    function render(): void {
        setCurrentGen(calculateNextGen(currentGen))
    }

    return (
        <div className="flex justify-center">
            <div className="w-[] justify-center custom_grid" style={gridSize}>

                {currentGen.map((column: number[], y: number) => {
                    return (
                        column.map((item: number, x: number) => {
                            return (
                              <Cell
                                key={x + y * DIM.y}
                                size={cellSize}
                                updateCellState={handleClick}
                                id={[x, y]}
                                alive={item}
                              ></Cell>
                            );
                        }))
                })}




            </div>
            <button onClick={() => render()}>Next gen</button>
        </div>
    )
}

export default GameGrid