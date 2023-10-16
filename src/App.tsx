import React from "react"
import "./App.css"
import { GanttTable, GanttTableEvent } from "./lib"

function App() {
  const events: GanttTableEvent[] = [
    { title: "Alfonso XII", start: 1874, end: 1885 },
    { title: "Alfonso XIII", start: 1886, end: 1931 },
    { title: "Spanish Republic", start: 1931, end: 1939 },
    { title: "Francisco Franco", start: 1936, end: 1975, color: "firebrick" },
    { title: "Juan Carlos I", start: 1975, end: 2014 },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <GanttTable events={events} step={10} />
      </header>
    </div>
  )
}

export default App
