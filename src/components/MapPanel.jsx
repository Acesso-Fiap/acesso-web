import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";
import { station } from "../dados";
import { getWalkingRoute } from "../rotas";
export default function MapPanel({
  places,
  selectedId,
  onSelect,
  routePlace,
  onClearRoute,
}) {
  const [routeStatus, setRouteStatus] = useState({
    loading: false,
    error: "",
    distance: null,
  });
  const [retry, setRetry] = useState(0);
  const container = useRef(null),
    map = useRef(null),
    layer = useRef(null),
    route = useRef(null),
    callback = useRef(onSelect);
  callback.current = onSelect;
  useEffect(() => {
    const instance = L.map(container.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView([-23.5625, -46.6551], 16);
    map.current = instance;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    function updateWheel() {
      if (
        desktop.matches &&
        navigator.maxTouchPoints === 0 &&
        container.current?.matches(":hover")
      )
        instance.scrollWheelZoom.enable();
      else instance.scrollWheelZoom.disable();
    }
    const mapElement = container.current;
    const stopWheel = () => instance.scrollWheelZoom.disable();
    mapElement.addEventListener("mouseenter", updateWheel);
    mapElement.addEventListener("mouseleave", stopWheel);
    desktop.addEventListener("change", updateWheel);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(instance);
    L.control
      .zoom({
        position: "bottomright",
        zoomInTitle: "Aproximar mapa",
        zoomOutTitle: "Afastar mapa",
      })
      .addTo(instance);
    L.marker(station.coordinates, {
      icon: L.divIcon({
        html: '<span class="grid size-8.5 place-items-center rounded-[9px] border-2 border-ink bg-white font-extrabold text-ink shadow-md">M</span>',
        className: "bg-transparent border-0",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
      title: "Estação Trianon–Masp, posição aproximada",
    })
      .addTo(instance)
      .bindTooltip("Trianon–Masp · ponto de partida");
    layer.current = L.layerGroup().addTo(instance);
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      mapElement.removeEventListener("mouseenter", updateWheel);
      mapElement.removeEventListener("mouseleave", stopWheel);
      desktop.removeEventListener("change", updateWheel);
      instance.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    if (!layer.current) return;
    layer.current.clearLayers();
    places.forEach((place) => {
      const marker = L.marker(place.coordinates, {
        icon: L.divIcon({
          html: `<span class="grid size-10.75 place-items-center rounded-[50%_50%_50%_8px] border-[3px] border-white text-[13px] font-bold text-white shadow-md ${selectedId === place.id ? "bg-[#8d3fc0]" : "bg-blue"}">${place.number}</span>`,
          className: "bg-transparent border-0",
          iconSize: [44, 44],
          iconAnchor: [22, 44],
        }),
        title: place.name,
        keyboard: true,
      }).addTo(layer.current);
      marker.bindTooltip(place.name, {
        direction: "top",
        offset: [0, -40],
      });
      marker.on("click", () => callback.current(place));
    });
  }, [places, selectedId]);
  useEffect(() => {
    if (!map.current) return;
    if (route.current) {
      route.current.remove();
      route.current = null;
    }
    if (!routePlace) {
      setRouteStatus({ loading: false, error: "", distance: null });
      return;
    }
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setRouteStatus({ loading: true, error: "", distance: null });
    getWalkingRoute(
      station.coordinates,
      routePlace.coordinates,
      controller.signal,
    )
      .then((result) => {
        if (!active) return;
        route.current = L.polyline(result.coordinates, {
          color: "#3156d9",
          weight: 6,
          opacity: 0.95,
        }).addTo(map.current);
        map.current.fitBounds(route.current.getBounds(), {
          padding: [65, 100],
          maxZoom: 17,
        });
        setRouteStatus({
          loading: false,
          error: "",
          distance: result.distance,
        });
      })
      .catch((error) => {
        if (active)
          setRouteStatus({
            loading: false,
            error: controller.signal.aborted
              ? "O cálculo demorou demais. Tente novamente."
              : error.message,
            distance: null,
          });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [routePlace, retry]);
  return (
    <section
      className="relative isolate min-h-165 min-w-0 bg-[#dce8f7] max-[760px]:min-h-105 [&_.leaflet-tile-pane]:saturate-50 [&_.leaflet-tile-pane]:contrast-90 [&_.leaflet-control-attribution]:text-[9px]!"
      id="mapa"
      aria-label={
        routePlace
          ? `Mapa do trajeto visual até ${routePlace.name}`
          : "Mapa dos destinos, também disponíveis na lista"
      }
    >
      <div
        ref={container}
        className="absolute inset-0 h-full w-full bg-[#dce8f7]"
      />
      <div className="absolute top-5 left-5 z-450 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2.5 text-xs text-ink shadow-sm">
        <span className="inline-block size-1.5 shrink-0 rounded-full bg-blue" />{" "}
        Paulista e arredores
      </div>
      <button
        className="absolute top-5 right-4.5 z-450 flex items-center gap-1.75 rounded-full bg-white px-3 py-2.5 text-xs text-ink shadow-sm max-[1100px]:top-17 max-[1100px]:right-auto max-[1100px]:left-5 max-[760px]:top-5 max-[760px]:right-3.75 max-[760px]:left-auto max-[760px]:p-3 max-[760px]:text-[0px]"
        onClick={() => map.current?.setView([-23.5625, -46.6551], 16)}
      >
        <LocateFixed size={17} /> Centralizar região
      </button>
      {routePlace ? (
        <div
          className="absolute bottom-6.75 left-4.5 z-450 max-w-[calc(100%-75px)] rounded-[15px] bg-white/95 p-3 text-xs text-ink shadow-sm"
          role="status"
        >
          <strong>Trianon–Masp → {routePlace.name}</strong>
          {routePlace.routeNote && (
            <p className="mt-1">{routePlace.routeNote}</p>
          )}
          {routeStatus.loading ? (
            <p className="mt-1">Calculando caminho a pé…</p>
          ) : routeStatus.error ? (
            <div>
              <p className="mt-1" role="alert">
                {routeStatus.error}
              </p>
              <button
                className="min-h-9 font-semibold text-blue underline"
                onClick={() => setRetry((value) => value + 1)}
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <div>
              <p className="mt-1">
                Percurso a pé · aproximadamente{" "}
                {Math.round(routeStatus.distance)} m
              </p>
              <p className="mt-1">
                Segue a malha mapeada. Pontos de referência aproximados;
                acessibilidade não certificada.
              </p>
            </div>
          )}
          <p className="mt-1 text-[10px]">
            <a
              className="underline"
              href="https://routing.openstreetmap.de/about.html"
              target="_blank"
              rel="noreferrer"
            >
              Rotas: OSRM / FOSSGIS
            </a>{" "}
            ·{" "}
            <a
              className="underline"
              href="https://www.openstreetmap.org/fixthemap"
              target="_blank"
              rel="noreferrer"
            >
              Corrigir mapa
            </a>
          </p>
          <button
            className="mt-2 min-h-9 font-semibold text-blue underline"
            onClick={onClearRoute}
          >
            Limpar trajeto
          </button>
        </div>
      ) : (
        <div className="absolute bottom-6.75 left-4.5 z-450 flex max-w-[calc(100%-36px)] flex-wrap items-center gap-2 rounded-[15px] bg-white/95 px-3 py-2.5 text-[11px] text-ink max-[760px]:text-[10px]">
          <span className="size-1.75 shrink-0 rounded-full bg-blue" /> Destinos
          do projeto <span className="mx-0.75 h-3 w-px bg-[#d8ded2]" /> Posições
          aproximadas
        </div>
      )}
    </section>
  );
}
