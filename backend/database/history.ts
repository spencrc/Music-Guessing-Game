import { STARTING_DATE } from '../config.ts'
import databaseClient from './databaseClient.ts'
import { HistoryRow } from '../types.ts'

const getTargetDateISO = (day: number): string => {
  const targetDate = new Date(STARTING_DATE)
  targetDate.setDate(targetDate.getDate() + day)
  return targetDate.toISOString().split('T')[0]
}

export const getHistoryByDay = async (
  day: number,
  selectArguments: string = '*',
): Promise<HistoryRow | null> => {
  const dayISO = getTargetDateISO(day)

  const { data, error } = await databaseClient
    .from('history')
    .select(selectArguments)
    .eq('day', dayISO)
    .single<HistoryRow>()

  if (error) throw new Error(`Supabase error: ${error.message}`)

  return data
}

export const getSongName = async (day: number, song: number): Promise<string> => {
  try {
    const data = (await getHistoryByDay(day)) as HistoryRow
    return data[`song_${song}`]
  } catch (err) {
    throw new Error(`No song ${song} found for day ${day}!`)
  }
}

export default getHistoryByDay
