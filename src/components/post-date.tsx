import React from "react"

const DateComp = ({ date }: { date: string }) => {
  return (
    <time dateTime={date}>
      {new Date(date).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </time>
  )
}

export default DateComp
