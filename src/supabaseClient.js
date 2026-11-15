import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url, key) : null;

export async function getUser(create = false) {
  if (!supabase)
    throw new Error(
      "Configure a URL e a chave pública do Supabase no arquivo .env.local.",
    );
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (data.session) return data.session.user;
  if (!create) return null;

  const result = await supabase.auth.signInAnonymously();
  if (result.error)
    throw new Error(
      "Não foi possível iniciar a sessão. Confira se Anonymous Sign-Ins está habilitado no Supabase.",
    );
  return result.data.user;
}
