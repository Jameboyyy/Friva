import 'dotenv/config';

export default {
    expo: {
      name: "Friva",
      slug: "Friva",
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      },
    },
  };
  