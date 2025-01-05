import { useState } from "react"
import GameGrid from "../GameGrid/GameGrid"

type Props = {}

const shapes = ["Pulsar"]

export default function GameWindow({}: Props) {
  const [pattern,setPattern] = useState("")

  function patternChange(str:string){
    setPattern(str);
    console.log(pattern + "changed")
  }

  return (
    <div className="flex justify-center">
      <GameGrid pattern={pattern}></GameGrid>
      <div className="flex flex-col">
        {}
        <button onClick={() => patternChange("Pulsar")}>Pulsar</button>
        <button onClick={() => patternChange("Beacon")}>Beacon</button>
        <button onClick={() => patternChange("Pentad")}>Pentad</button>
        <button onClick={() => patternChange("")}>None</button>
      </div>
    
    </div>
  )
}