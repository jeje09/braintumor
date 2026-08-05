import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경 변수가 없습니다. .env 파일을 확인해주세요.');
}

console.log('Supabase Connected to:', supabaseUrl); // HMR 갱신용 로그

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
