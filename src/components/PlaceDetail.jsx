import {
  ArrowUpRight,
  Check,
  CircleHelp,
  MapPin,
  Plus,
  Route,
} from "lucide-react";
import { features, statusLabels } from "../dados";
export default function PlaceDetail({ place, onReport, onRoutes }) {
  return (
    <div>
      <span className="text-[11px] font-bold tracking-[1.7px]">
        {place.category} · PAULISTA
      </span>
      <p className="my-3 flex items-center gap-1.5 text-sm text-[#52607a]">
        <MapPin size={16} />
        {place.address}
      </p>
      <p className="my-3 text-sm leading-[1.7] text-[#52607a]">
        {place.description}
      </p>
      <h3 className="mt-5.5 mb-2.25 text-[17px] font-semibold">
        O que sabemos sobre o acesso
      </h3>
      <ul className="list-none p-0 [&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:gap-3 [&_li]:border-b [&_li]:border-[#e1e5f0] [&_li]:py-3.25 [&_li]:text-[13px] [&_li>span:first-child]:block [&_li_svg]:inline [&_li_svg]:mr-1 max-[760px]:[&_li]:items-start max-[760px]:[&_li]:text-xs">
        {features.map((feature) => (
          <li key={feature.id}>
            <span>
              {place.resources[feature.id] === "institution" ? (
                <Check size={18} />
              ) : (
                <CircleHelp size={18} />
              )}{" "}
              {feature.label}
              <small className="block max-w-[320px] text-[11px] font-normal leading-relaxed text-slate-600">
                {place.resourceNotes[feature.id]}
              </small>
            </span>
            <span
              className={`inline-block rounded-[9px] px-2.25 py-1.25 text-[11px] max-[760px]:max-w-31.25 max-[760px]:text-[10px]   ${place.resources[feature.id] === "institution" ? "bg-[#e7edff]   text-[#2d4d98]" : place.resources[feature.id] === "na" ? "bg-gray-100 text-gray-600" : "bg-[#fff0c4] text-[#74531b]"}`}
            >
              {statusLabels[place.resources[feature.id]]}
            </span>
          </li>
        ))}
      </ul>
      <p className="my-3 text-sm leading-[1.7] text-[#52607a]">
        {place.detail}
      </p>
      <section className="mt-5 rounded-2xl bg-[#eeebfb] p-4 text-sm leading-relaxed">
        <h3 className="font-semibold">Planeje sua visita</h3>
        <p className="mt-2">{place.hours}</p>
        <p className="mt-2">{place.visit}</p>
        <a
          className="mt-3 inline-block text-blue underline"
          href={place.contactUrl}
        >
          {place.contact}
        </a>
      </section>
      <h3 className="mt-5 font-semibold">Fontes da pesquisa online</h3>
      <ul className="mt-2 space-y-2">
        {place.sources.map((source) => (
          <li key={source.url}>
            <a
              className="inline-flex items-center gap-1 text-xs text-blue underline"
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
              <ArrowUpRight size={14} />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Consulta em {place.checked}. Horários e disponibilidade podem mudar.
        “Não informado” significa ausência de confirmação nas fontes
        consultadas, não ausência do recurso.
      </p>
      <div className="mt-6 flex flex-wrap justify-end gap-2.5">
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 border border-[#bbc7e7] bg-white text-ink hover:bg-[#eaf0ff]"
          onClick={onRoutes}
        >
          <Route size={16} /> Consultar caminho
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-blue text-white hover:bg-[#203caa]"
          onClick={() => onReport(place.id)}
        >
          <Plus size={17} /> Registrar observação
        </button>
      </div>
    </div>
  );
}
