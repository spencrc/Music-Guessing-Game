import type { Config } from "@netlify/functions"
import { supabase } from "../../backend/supabase"

export default async (req: Request) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)
}

export const config: Config = {
    schedule: "@daily"
}