import { config } from "dotenv"

config()

export const SUPABASE_URL = process.env.SUPABASE_URL!
export const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!

export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type"
}