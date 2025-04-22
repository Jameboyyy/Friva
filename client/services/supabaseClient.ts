import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

type SupabaseConfig = {
    supabaseUrl: string;
    supabaseAnonKey: string;
};

const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig?.extra as SupabaseConfig;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);