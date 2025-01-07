import { useEffect, useRef, useState } from "react"
import GameGrid from "../GameGrid/GameGrid"
import {shapes} from "../../assets/patternList.js"
import ShapeCard from "../ShapeCard/ShapeCard.jsx"

type Props = {}

export default function GameWindow({}: Props) {

  const [pattern,setPattern] = useState("")
  const [running, setRunning] = useState(false)
  const [speed,setSpeed] = useState(50)
  const MIN_DELAY = 50
  const MAX_DELAY = 1000
  const interval = useRef<number | null>(null)
  const gridRef = useRef()

  function patternChange(str:string){
    setPattern(str);
    setRunning(false)
  }

  function toggleSimulation(){
    setRunning(!running)
  }

  function speedChange(e:Event){
    setSpeed(parseInt(e.target.value))
  }

  useEffect( ()=>{
    let timeDelay = MAX_DELAY - speed*10 + MIN_DELAY;
    if(!interval.current && running){
      interval.current = setInterval(() => {
        gridRef.current.renderStep()
      }, timeDelay);
    } else if (!running) {
      clearInterval(interval.current);
      interval.current = null
    } else {
      clearInterval(interval.current);
      interval.current = setInterval(() => {
        gridRef.current.renderStep()
      }, timeDelay);

    }
  },[running,speed])

  function clearGrid(){
    setRunning(false)
    gridRef.current.clearGrid()
  }

  return (
    <div className="grid grid-cols-[60vw,40vw] items-center h-screen bg-slate-400">
      <GameGrid pattern={pattern} ref={gridRef}></GameGrid>
      <div className="grid grid-rows-[85vh,15vh] items-center">
        <div className="flex flex-row flex-wrap gap-5">
          {Object.entries(shapes).map(([shape, value]) => {
            return (
              <ShapeCard
                onClick={() => patternChange(shape)}
                coordinates={value}
                name={shape}
                current={pattern == shape}
              ></ShapeCard>
            );
          })}
        </div>

        {/* Menu bar */}
        <div className="bg-white w-[90%] border-2 border-black rounded-[20px] p-3 flex justify-center gap-5 items-center">
          <a onClick={() => toggleSimulation()} 
             className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-md font-medium text-white cursor-pointer 
                        hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
            {running ? "Stop" : "Start"}
          </a>

          <div className="flex flex-col-reverse">
            <input
              onChange={speedChange}
              type="range"
              min="1"
              max="100"
              step="1"
              value={speed}
            ></input>
            <label>Delay: {MAX_DELAY - speed*10 + MIN_DELAY} ms</label>
          </div>

          <a onClick={() => clearGrid()} 
             className="inline-block rounded border border-red-300 bg-red-500 px-4 py-3 text-md font-medium text-white cursor-pointer 
                        hover:bg-red-600 focus:outline-none focus:ring active:text-indigo-500">
            Clear
          </a>

        </div>
      </div>
    </div>
  );
}