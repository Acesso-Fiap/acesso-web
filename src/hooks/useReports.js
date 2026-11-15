import { useEffect, useState } from "react";
import {
  getReports,
  createReport,
  updateReport,
  deleteReport,
} from "../relatos";
import { validateReport } from "../validacao";

export function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function refresh() {
    setLoading(true);
    setError("");
    try {
      setReports(await getReports());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
  }, []);
  async function save(data, id) {
    if (
      id &&
      !reports.some(
        (report) => String(report.id) === String(id) && report.canEdit,
      )
    )
      throw new Error(
        "Você só pode editar suas próprias observações neste navegador.",
      );
    const errors = validateReport(data);
    if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...data,
        description: data.description.trim(),
        verification: "community",
      };
      const row = id
        ? await updateReport(id, payload)
        : await createReport(payload);
      if (!row?.id)
        throw new Error(
          "O serviço não retornou o registro salvo. Atualize a lista antes de tentar novamente.",
        );
      setReports((old) =>
        id
          ? old.map((item) => (String(item.id) === String(id) ? row : item))
          : [row, ...old],
      );
      return row;
    } finally {
      setBusy(false);
    }
  }
  async function remove(id) {
    if (
      !reports.some(
        (report) => String(report.id) === String(id) && report.canEdit,
      )
    )
      throw new Error(
        "Você só pode excluir suas próprias observações neste navegador.",
      );
    setBusy(true);
    setError("");
    try {
      await deleteReport(id);
      setReports((old) => old.filter((row) => String(row.id) !== String(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setBusy(false);
    }
  }
  return {
    reports,
    loading,
    busy,
    error,
    refresh,
    save,
    remove,
  };
}
