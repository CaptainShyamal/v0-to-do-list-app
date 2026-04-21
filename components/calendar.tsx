"use client"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function TaskCalendar({ onDateChange }: any) {
  return (
    <div className="border rounded-xl p-4">
      <Calendar onChange={onDateChange} />
    </div>
  )
}