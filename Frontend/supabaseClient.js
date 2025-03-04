import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgkljlnwzjrkbyohmwfx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBna2xqbG53empya2J5b2htd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODE0MDQsImV4cCI6MjA1NjU1NzQwNH0.3PUYdOr_OzIfAi08MnmV_vbHu6bG8NPv2kfSlvRiBX8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
