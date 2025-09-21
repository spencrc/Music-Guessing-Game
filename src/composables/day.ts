import { starting_date } from '../../config.json'

export const getMsDifference = (date: Date): number => {
  return date.getTime() - new Date(starting_date).getTime()
}

export const getTargetDate = (dayNumber: number): Date => {
  const targetDate = new Date(starting_date)
  targetDate.setDate(targetDate.getDate() + dayNumber)
  return targetDate
}

export const getDayNumber = (diffMs: number): number => {
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}
