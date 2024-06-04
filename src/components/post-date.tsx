import React from "react"

export const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

const DateComp = ({ date }: { date: string }) => {
  return <time dateTime={date}>{formatDate(date)}</time>
}

export default DateComp
