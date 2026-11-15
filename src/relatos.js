import { supabase, getUser } from "./supabaseClient";
import { legacyReports } from "./dados";

const fields = "id, placeId, type, description, observedAt, user_id";
function formData(data) {
  return {
    placeId: data.placeId,
    type: data.type,
    description: data.description.trim(),
    observedAt: data.observedAt,
  };
}

export async function getReports() {
  const user = await getUser();
  const { data, error } = await supabase
    .from("observacoes")
    .select(fields)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return [
    ...data.map((row) => ({
      ...row,
      verification: "community",
      canEdit: row.user_id === user?.id,
    })),
    ...legacyReports,
  ];
}

export async function createReport(data) {
  await getUser(true);
  const result = await supabase
    .from("observacoes")
    .insert(formData(data))
    .select(fields)
    .single();
  if (result.error) throw result.error;
  return { ...result.data, verification: "community", canEdit: true };
}

export async function updateReport(id, data) {
  const user = await getUser();
  if (!user)
    throw new Error(
      "A sessão que criou esta observação não está disponível neste navegador.",
    );
  const result = await supabase
    .from("observacoes")
    .update(formData(data))
    .eq("id", id)
    .eq("user_id", user.id)
    .select(fields)
    .single();
  if (result.error) throw result.error;
  return { ...result.data, verification: "community", canEdit: true };
}

export async function deleteReport(id) {
  const user = await getUser();
  if (!user)
    throw new Error(
      "A sessão que criou esta observação não está disponível neste navegador.",
    );
  const { error } = await supabase
    .from("observacoes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .single();
  if (error) throw error;
}
