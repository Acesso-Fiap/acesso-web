import { useState } from "react";
import { places } from "../dados";
import { reportTypes, today, validateReport } from "../validacao";
export default function ReportForm({
  initial,
  placeId,
  onSave,
  onCancel,
  busy,
}) {
  const [data, setData] = useState(
    initial || {
      placeId: placeId || "",
      type: "",
      description: "",
      observedAt: today(),
    },
  );
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState("");
  const update = (event) =>
    setData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  async function submit(event) {
    event.preventDefault();
    setFailure("");
    const nextErrors = validateReport(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    try {
      await onSave(data, initial?.id);
    } catch (error) {
      setFailure(error.message);
    }
  }
  const errorProps = (name) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <form onSubmit={submit} noValidate>
      <p className="text-sm text-[#52607a]">
        Uma observação objetiva ajuda outras pessoas a planejar a visita. Não
        inclua nomes, contatos ou dados pessoais.
      </p>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Uma sessão anônima identifica sua autoria neste navegador, sem cadastro.
        Use o mesmo navegador para editar ou excluir depois.
      </p>
      <label
        htmlFor="placeId"
        className="mt-4.5 mb-1.5 flex justify-between text-[13px] font-semibold [&>span]:text-[11px] [&>span]:font-normal [&>span]:text-[#5b6880]"
      >
        Local <span>obrigatório</span>
      </label>
      <select
        id="placeId"
        name="placeId"
        value={data.placeId}
        onChange={update}
        {...errorProps("placeId")}
        className="w-full rounded-[10px] border border-[#becae3] bg-white p-2.75 text-sm text-ink"
      >
        <option value="">Selecione um lugar</option>
        {places.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </select>
      {errors.placeId && (
        <small className="mt-2 block text-xs text-[#a2362c]" id="placeId-error">
          {errors.placeId}
        </small>
      )}
      <div className="grid grid-cols-[1.2fr_1fr] gap-3.75 max-[760px]:grid-cols-1">
        <div>
          <label
            htmlFor="type"
            className="mt-4.5 mb-1.5 flex justify-between text-[13px] font-semibold [&>span]:text-[11px] [&>span]:font-normal [&>span]:text-[#5b6880]"
          >
            O que você observou?
          </label>
          <select
            id="type"
            name="type"
            value={data.type}
            onChange={update}
            {...errorProps("type")}
            className="w-full rounded-[10px] border border-[#becae3] bg-white p-2.75 text-sm text-ink"
          >
            <option value="">Selecione o recurso</option>
            {reportTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <small
              className="mt-2 block text-xs text-[#a2362c]"
              id="type-error"
            >
              {errors.type}
            </small>
          )}
        </div>
        <div>
          <label
            htmlFor="observedAt"
            className="mt-4.5 mb-1.5 flex justify-between text-[13px] font-semibold [&>span]:text-[11px] [&>span]:font-normal [&>span]:text-[#5b6880]"
          >
            Data da observação
          </label>
          <input
            type="date"
            id="observedAt"
            name="observedAt"
            max={today()}
            value={data.observedAt}
            onChange={update}
            {...errorProps("observedAt")}
            className="w-full rounded-[10px] border border-[#becae3] bg-white p-2.75 text-sm text-ink"
          />
          {errors.observedAt && (
            <small
              className="mt-2 block text-xs text-[#a2362c]"
              id="observedAt-error"
            >
              {errors.observedAt}
            </small>
          )}
        </div>
      </div>
      <label
        htmlFor="description"
        className="mt-4.5 mb-1.5 flex justify-between text-[13px] font-semibold [&>span]:text-[11px] [&>span]:font-normal [&>span]:text-[#5b6880]"
      >
        Conte o que encontrou
      </label>
      <textarea
        id="description"
        name="description"
        rows={4}
        maxLength={600}
        value={data.description}
        onChange={update}
        placeholder="Descreva o recurso e o ponto exato: entrada, esquina, andar…"
        {...errorProps("description")}
        className="w-full resize-y rounded-[10px] border border-[#becae3] bg-white p-2.75 text-sm text-ink"
      />
      <div className="flex justify-between gap-3 text-[11px] text-[#5b6880] max-[760px]:text-[10px]">
        <span>
          Mínimo de 15 caracteres. Publicado como relato da comunidade, sem
          validação institucional.
        </span>
        <span>{data.description.length}/600</span>
      </div>
      {errors.description && (
        <small
          className="mt-2 block text-xs text-[#a2362c]"
          id="description-error"
        >
          {errors.description}
        </small>
      )}
      {failure && (
        <p className="mt-2 block text-xs text-[#a2362c]" role="alert">
          {failure}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-end gap-2.5">
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 border border-[#bbc7e7] bg-white text-ink hover:bg-[#eaf0ff]"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancelar
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-blue text-white hover:bg-[#203caa]"
          type="submit"
          disabled={busy}
        >
          {busy
            ? "Salvando…"
            : initial
              ? "Salvar alterações"
              : "Salvar observação"}
        </button>
      </div>
    </form>
  );
}
