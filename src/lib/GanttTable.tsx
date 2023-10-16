import React from "react"
import "./GanttTable.css"
import { GanttTableEvent } from "."

interface GanttTableProps {
  events: GanttTableEvent[]
  step: number
}

const GanttTable: React.FC<GanttTableProps> = (props) => {
  const { events, step } = props
  let minYear = Math.min.apply(
    Math,
    events.map((event) => event.start)
  )
  if (minYear % step != 0) {
    minYear = minYear - (minYear % step)
  }

  let maxYear =
    Math.max.apply(
      Math,
      events.map((event) => event.end)
    ) + 1
  if (maxYear % step != 0) {
    maxYear = maxYear + (step - (maxYear % step))
  }

  const yearsCount = maxYear - minYear

  const chunksCount = Math.floor(yearsCount / step)
  const chunks = Array.from(Array(chunksCount)).map((_, chunkIndex) => {
    return minYear + chunkIndex * step
  })

  const isFilled = (event: GanttTableEvent, year: number) => {
    return year >= event.start && year <= event.end
  }

  const chunkWidth = `calc(99% / ${chunks.length})`
  const cellWidth = `calc(99% / ${chunks.length} / ${step} - ${1 / step}px)`

  return (
    <div className="gantt_table">
      <div className="gantt_left">
        {events.map((event, index) => {
          return (
            <div className="gantt_left_event_title" key={index}>
              {event.title} ({event.end - event.start + 1})
            </div>
          )
        })}
      </div>
      <div className="gantt_right">
        {events.map((event, index) => {
          return (
            <div className="gantt_row" key={index}>
              {Array.from(Array(yearsCount)).map((_, index2) => {
                const currentYear = minYear + index2
                return (
                  <div
                    className={`gantt_year ${
                      isFilled(event, currentYear) && "filled"
                    } `}
                    key={index2}
                    style={{
                      width: cellWidth,
                      backgroundColor: isFilled(event, currentYear)
                        ? event.color
                        : "#555",
                      borderRight:
                        (index2 + 1) % step == 0 ? "1px solid white" : "none",
                    }}
                  ></div>
                )
              })}
            </div>
          )
        })}
        {chunks.map((chunk, index) => {
          return (
            <div
              className="gantt_chunk"
              key={index}
              style={{ width: chunkWidth }}
            >
              <div className="gantt_chunk_flex">
                <span>{chunk}</span>
                <span>{chunk + step - 1}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default GanttTable
