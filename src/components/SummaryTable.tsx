import { genarateDateFromYearBeginning } from "../utils/generate_date_from_year_beginnig"
import { HabitDay } from "./HabitDay"

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const summaryDates = genarateDateFromYearBeginning()

const minimumSummaryDateSize = 18 * 7 // 18 Weeks
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length

export function SummaryTable() {
  return (
    <div className="w-full flex">
      
      <div className="grid grid-rows-7 grid-flow-row gap-3 px-4">
        {weekDays.map((weekDay, index) => {
          return (
            <div key={`${weekDay}-${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            {weekDay}
          </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summaryDates.map((date) => {
            return <HabitDay key={date.toString()} />
          })
        }

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-60 cursor-not-allowed" />
          )
        })}
      </div>
    </div>
  )
}