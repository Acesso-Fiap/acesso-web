import { MessageSquare, Pencil, Plus, Trash2, RefreshCw } from "lucide-react";
import { places } from "../dados";
export default function ReportsList({ state, onNew, onEdit, onDelete }) {
  return (
    <section className="mt-7.5 min-h-[80vh] rounded-t-[40px] bg-cream px-16 py-15 max-[760px]:mt-5.5 max-[760px]:px-5.5 max-[760px]:py-8.75">
      <div className="flex items-center justify-between gap-6.25 max-[760px]:flex-col max-[760px]:items-start">
        <div>
          <p className="text-[11px] font-bold tracking-[1.7px]">
            CADA OLHAR FAZ DIFERENÇA
          </p>
          <h1 className="my-3 text-[46px] leading-tight font-medium tracking-[-1.7px] text-ink max-[760px]:text-4xl">
            Observações da região
          </h1>
          <p className="text-sm text-[#596781]">
            Registre recursos e barreiras que merecem atenção.
          </p>
        </div>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-blue text-white hover:bg-[#203caa]"
          onClick={onNew}
        >
          <Plus size={18} /> Nova observação
        </button>
      </div>
      <div className="mt-4 rounded-[13px] border border-[#e4cf9c] bg-[#fff1cd] px-3.75 py-3 text-xs text-[#725422]">
        Sem cadastro: sua sessão anônima permite editar ou excluir as
        observações criadas neste navegador. Limpar os dados do site ou trocar
        de navegador perde esse acesso. Relatos antigos sem autoria ficam
        disponíveis para leitura.
      </div>
      <div className="my-6.25 flex items-center justify-between text-xs">
        <span>{state.reports.length} observações</span>
        <button
          className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
          onClick={state.refresh}
          disabled={state.loading}
        >
          <RefreshCw size={15} /> Atualizar
        </button>
      </div>
      {state.error && (
        <p role="alert" className="mt-2 block text-xs text-[#a2362c]">
          {state.error}
        </p>
      )}
      {state.loading ? (
        <p role="status" className="text-sm text-[#596781]">
          Carregando observações…
        </p>
      ) : state.reports.length === 0 ? (
        <div className="px-7.5 py-16.25 text-center text-[#566789] [&>svg]:mx-auto [&>svg]:mb-4.5">
          <MessageSquare size={36} />
          <h2 className="mt-4 text-[19px] font-semibold text-ink">
            O primeiro olhar pode ser o seu.
          </h2>
          <p className="text-sm text-[#596781]">
            Ainda não há observações registradas. Conte o que encontrou em um
            dos três lugares.
          </p>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 border border-[#bbc7e7] bg-white text-ink hover:bg-[#eaf0ff]"
            onClick={onNew}
          >
            Registrar uma observação
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[760px]:grid-cols-1">
          {state.reports.map((report) => (
            <article
              className="rounded-[22px] border border-[#d8deee] bg-white p-5.5 nth-[3n+1]:bg-[#edf5fe] nth-[3n+2]:bg-[#f2eefe] [&>div]:flex [&>div]:justify-between"
              key={report.id}
            >
              <span className="inline-block rounded-[9px] px-2.25 py-1.25 text-[11px] max-[760px]:max-w-31.25 max-[760px]:text-[10px] bg-[#fff0c4] text-[#74531b]">
                Relato da comunidade · sem validação institucional
              </span>
              <h2 className="mt-4 text-[19px] font-semibold text-ink">
                {places.find((place) => place.id === report.placeId)?.name ||
                  "Local não identificado"}
              </h2>
              <p className="mt-1.5 text-xs text-[#5a6581]">
                {report.type} ·{" "}
                {report.observedAt?.split("-").reverse().join("/")}
              </p>
              <p className="my-4.5 text-sm wrap-break-word whitespace-pre-wrap">
                {report.description}
              </p>
              {report.canEdit ? (
                <div>
                  <button
                    className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
                    onClick={() => onEdit(report)}
                    disabled={state.busy}
                  >
                    <Pencil size={15} /> Editar
                  </button>
                  <button
                    className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4 text-[#a2362c]!"
                    onClick={() => onDelete(report)}
                    disabled={state.busy}
                  >
                    <Trash2 size={15} /> Excluir
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-xs text-slate-600">
                  {report.legacy
                    ? "Registro antigo · autoria não identificada"
                    : "Observação de outro navegador · somente leitura"}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
