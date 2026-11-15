import { useState } from "react";
import { Route } from "lucide-react";
import { places, station } from "../dados";
export default function RouteComparison({
  initialPlaceId = "shopping",
  onStart,
}) {
  const [placeId, setPlaceId] = useState(initialPlaceId);
  const place = places.find((item) => item.id === placeId) || places[2];
  return (
    <div className="space-y-5 text-sm leading-relaxed">
      <label className="block font-semibold" htmlFor="route-destination">
        Seu destino
      </label>
      <select
        id="route-destination"
        className="w-full rounded-xl border border-slate-300 bg-white p-3"
        value={place.id}
        onChange={(event) => setPlaceId(event.target.value)}
      >
        {places.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-[#d6dcef] p-5">
          <Route size={24} />
          <h3 className="mt-3 font-semibold">Partida · {station.name}</h3>
          <p className="mt-2">Linha 2–Verde · {station.address}.</p>
          <p className="mt-2">{station.hours}.</p>
          <p className="mt-2">
            O Metrô informa elevador preferencial para pessoas com deficiência e
            mobilidade reduzida. A página não identifica a saída exata do
            elevador nem sua operação em tempo real.
          </p>
          <a
            className="mt-3 inline-block text-blue underline"
            href={station.url}
            target="_blank"
            rel="noreferrer"
          >
            Informações oficiais da estação
          </a>
        </article>
        <article className="rounded-2xl border border-[#d6dcef] p-5">
          <h3 className="font-semibold">Chegada · {place.name}</h3>
          <p className="mt-2">{place.address}</p>
          {place.routeNote && <p className="mt-2">{place.routeNote}</p>}
          <p className="mt-2">{place.visit}</p>
          <p className="mt-2">{place.resourceNotes.stepFree}</p>
          <a
            className="mt-3 inline-block text-blue underline"
            href={place.sources[place.id === "shopping" ? 1 : 0].url}
            target="_blank"
            rel="noreferrer"
          >
            Fonte sobre o destino
          </a>
        </article>
      </div>
      <button
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-blue px-5 py-3 font-semibold text-white"
        onClick={() => onStart(place)}
      >
        Iniciar trajeto <Route size={18} />
      </button>
      <p className="rounded-xl bg-[#eeebfb] p-4 text-xs">
        O caminho a pé é calculado pelas ruas e passagens cadastradas no
        OpenStreetMap e aparece no mapa do site. A origem e o destino são pontos
        de referência aproximados. A rota não garante ausência de degraus ou
        outras barreiras.
      </p>
      <a
        className="inline-block text-xs text-blue underline"
        href={place.contactUrl}
      >
        {place.contact}
      </a>
      <p className="text-xs text-slate-600">
        Pesquisa online consultada em {place.checked}.
      </p>
    </div>
  );
}
