import { useState } from "react"
import GameGrid from "../GameGrid/GameGrid"

type Props = {}

export default function GameWindow({}: Props) {
  const [pattern,setPattern] = useState("")

  function patternChange(str:string){
    setPattern(str);
    console.log(pattern + "changed")
  }

  return (
    <>
    <button onClick={() => patternChange("Pulsar")}>Pulsar</button>
    <button onClick={() => patternChange("Beacon")}>Beacon</button>
    <button onClick={() => patternChange("Pentad")}>Pentad</button>
    <button onClick={() => patternChange("")}>None</button>
    <GameGrid pattern={pattern}></GameGrid>
    </>
  )
}