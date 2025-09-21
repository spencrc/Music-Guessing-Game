import { starting_date } from '../../config.json'
import databaseClient from './databaseClient.ts'

export interface HistoryRow {
  day: Date
  [key: `song_${number}`]: string
  [key: `clue_${number}_start`]: number
}

const getTargetDateISO = (day: number): string => {
  const targetDate = new Date(starting_date)
  targetDate.setDate(targetDate.getDate() + day)
  return targetDate.toISOString().split('T')[0]
}

export const getHistoryByDay = async (day: number, selectArguments: string = '*'): Promise<HistoryRow | null> => {
  const dayISO = getTargetDateISO(day)

  const { data, error } = await databaseClient
    .from('history')
    .select(selectArguments)
    .eq('day', dayISO)
    .single<HistoryRow>()

  if (error) throw new Error(`Supabase error: ${error.message}`)

  return data
}
