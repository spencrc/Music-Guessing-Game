import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE } from '../config'

export default createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)
