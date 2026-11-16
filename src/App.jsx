import { useState } from "react";
import { ArrowRight, Info, MapPin } from "lucide-react";
import {
  About,
  Footer,
  Header,
  Hero,
  JourneyIntro,
  MapPanel,
  Modal,
  PlaceCard,
  PlaceDetail,
  ReportForm,
  ReportsList,
  RouteComparison,
  SearchFilters,
} from "./components";
import { usePlaces } from "./hooks/usePlaces";
import { useReports } from "./hooks/useReports";

export default function App() {
  const [view, setView] = useState("explore");
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [routePlace, setRoutePlace] = useState(null);
  const [notice, setNotice] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const filters = usePlaces(),
    reports = useReports();
  const navigate = (next) => {
    setView(next);
    setNotice("");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const newReport = (placeId) =>
    setModal({
      kind: "form",
      placeId: typeof placeId === "string" ? placeId : undefined,
    });
  const selectPlace = (place) => {
    setSelectedId(place.id);
    setModal({
      kind: "place",
      place,
    });
  };
  const close = () => {
    if (!reports.busy) setModal(null);
  };
  function startRoute(place) {
    setRoutePlace(place);
    setSelectedId(place.id);
    setModal(null);
    requestAnimationFrame(() =>
      document
        .getElementById("mapa")
        ?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  }
  async function save(data, id) {
    await reports.save(data, id);
    setModal(null);
    setView("reports");
    setNotice(
      id
        ? "Observação atualizada."
        : "Observação salva. Obrigado por contribuir!",
    );
  }
  async function remove() {
    setDeleteError("");
    try {
      await reports.remove(modal.report.id);
      setModal(null);
      setNotice("Observação excluída.");
    } catch (error) {
      setDeleteError(error.message);
    }
  }
  return (
    <>
      <Header view={view} onView={navigate} onReport={newReport} />
      <main id="conteudo">
        {notice && (
          <div
            className="fixed top-25 right-6 z-800 max-w-[calc(100%-48px)] rounded-2xl bg-ink px-4.5 py-3.5 text-[13px] text-white shadow-lg [&>button]:ml-5 [&>button]:text-[22px]"
            role="status"
          >
            {notice}
            <button
              aria-label="Dispensar mensagem"
              onClick={() => setNotice("")}
            >
              ×
            </button>
          </div>
        )}
        {view === "explore" ? (
          <>
            <Hero />
            <JourneyIntro onReport={newReport} />
            <section
              className="scroll-mt-6.25 bg-cream px-16 pt-9.5 pb-16 max-[1100px]:px-8 max-[760px]:px-4.5 max-[760px]:pt-7.5 max-[760px]:pb-10"
              id="explorar"
            >
              <div className="mb-6.5 flex items-center justify-between gap-5 max-[760px]:flex-col max-[760px]:items-start max-[760px]:px-1">
                <div>
                  <p className="text-[11px] font-bold tracking-[1.7px]">
                    PERTO DE VOCÊ, NA PAULISTA
                  </p>
                  <h2 className="mt-3 text-[clamp(29px,3.1vw,45px)] leading-tight font-medium tracking-[-1.7px] max-[760px]:text-[32px] max-[760px]:tracking-[-1.2px]">
                    Explore com mais informação.
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf0fa] px-4 py-3 text-xs text-[#384e79] max-[760px]:text-[11px]">
                  <MapPin size={16} /> Trianon–Masp, São Paulo
                </span>
              </div>
              <div className="grid min-h-165 grid-cols-[430px_1fr] overflow-hidden rounded-[26px] border border-[#d6deed] bg-white max-[1100px]:grid-cols-[390px_1fr] max-[760px]:grid-cols-1 max-[760px]:rounded-[22px]">
                <div className="relative z-2 min-w-0 border-r border-[#d6deed] bg-white max-[760px]:border-r-0">
                  <SearchFilters
                    filters={filters}
                    expanded={expanded}
                    onExpand={() => setExpanded((old) => !old)}
                  />
                  <div
                    className="flex justify-between gap-2 pt-5 pr-5.5 pb-2 pl-5.5 text-xs [&>span]:text-[11px] [&>span]:text-[#65708b] max-[760px]:px-4.75 max-[760px]:text-[11px]"
                    aria-live="polite"
                  >
                    <strong>
                      {filters.filtered.length}{" "}
                      {filters.filtered.length === 1
                        ? "lugar encontrado"
                        : "lugares encontrados"}
                    </strong>
                    <span>Recorte do projeto</span>
                  </div>
                  <div className="px-2.5">
                    {filters.filtered.map((place) => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        selected={place.id === selectedId}
                        onSelect={selectPlace}
                      />
                    ))}
                    {filters.filtered.length === 0 && (
                      <div className="px-7.5 py-16.25 text-center text-[#566789] [&>svg]:mx-auto [&>svg]:mb-4.5">
                        <h3>Nenhum lugar com esses filtros</h3>
                        <p>
                          Um recurso pode existir sem estar descrito nas fontes
                          online consultadas.
                        </p>
                        <button
                          className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
                          onClick={filters.reset}
                        >
                          Limpar filtros
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-1.75 px-5.5 py-5 text-[#58657d] [&>svg]:mt-0.5 [&>svg]:shrink-0">
                    <Info size={16} />
                    <p>
                      Consulte as fontes, os serviços disponíveis e as
                      orientações de visita nos detalhes.
                    </p>
                  </div>
                </div>
                <MapPanel
                  places={
                    routePlace &&
                    !filters.filtered.some(
                      (place) => place.id === routePlace.id,
                    )
                      ? [...filters.filtered, routePlace]
                      : filters.filtered
                  }
                  selectedId={selectedId}
                  onSelect={selectPlace}
                  routePlace={routePlace}
                  onClearRoute={() => setRoutePlace(null)}
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-5 rounded-[20px] bg-[#e6e0fa] p-6.25 [&_strong]:block [&_strong]:text-[17px] [&_strong]:font-semibold [&_span]:mt-1.75 [&_span]:block [&_span]:text-[13px] [&_span]:text-[#4e5577] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2.5 max-[760px]:p-5.5">
                <div>
                  <strong>O acesso começa antes da porta.</strong>
                  <span>
                    Consulte os acessos publicados e abra o trajeto até seu
                    destino no mapa.
                  </span>
                </div>
                <button
                  className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
                  onClick={() =>
                    setModal({
                      kind: "routes",
                    })
                  }
                >
                  Explorar caminhos <ArrowRight size={17} />
                </button>
              </div>
            </section>
            <Footer onReport={newReport} />
          </>
        ) : view === "reports" ? (
          <ReportsList
            state={reports}
            onNew={newReport}
            onEdit={(report) =>
              setModal({
                kind: "form",
                report,
              })
            }
            onDelete={(report) => {
              setDeleteError("");
              setModal({
                kind: "delete",
                report,
              });
            }}
          />
        ) : (
          <About />
        )}
      </main>
      {modal && (
        <Modal
          key={`${modal.kind}-${modal.report?.id || modal.place?.id || ""}`}
          title={
            modal.kind === "place"
              ? modal.place.name
              : modal.kind === "routes"
                ? "Do metrô ao seu destino"
                : modal.kind === "delete"
                  ? "Excluir esta observação?"
                  : modal.report
                    ? "Editar observação"
                    : "Compartilhe seu olhar"
          }
          wide={modal.kind === "routes"}
          onClose={close}
        >
          {modal.kind === "place" ? (
            <PlaceDetail
              place={modal.place}
              onReport={newReport}
              onRoutes={() =>
                setModal({
                  kind: "routes",
                  placeId: modal.place.id,
                })
              }
            />
          ) : modal.kind === "routes" ? (
            <RouteComparison
              initialPlaceId={modal.placeId}
              onStart={startRoute}
            />
          ) : modal.kind === "form" ? (
            <ReportForm
              initial={modal.report}
              placeId={modal.placeId}
              onSave={save}
              onCancel={close}
              busy={reports.busy}
            />
          ) : (
            <div>
              <p>O registro será removido e não poderá ser recuperado.</p>
              {deleteError && (
                <p role="alert" className="mt-2 block text-xs text-[#a2362c]">
                  {deleteError}
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-end gap-2.5">
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 border border-[#bbc7e7] bg-white text-ink hover:bg-[#eaf0ff]"
                  disabled={reports.busy}
                  onClick={close}
                >
                  Manter observação
                </button>
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-[#a2362c] text-white hover:bg-[#822b23]"
                  disabled={reports.busy}
                  onClick={remove}
                >
                  {reports.busy ? "Excluindo…" : "Excluir observação"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
