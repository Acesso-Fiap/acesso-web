import {
  ArrowUpRight,
  Bath,
  Accessibility,
  Trees,
  Landmark,
  Building2,
} from "lucide-react";
const illustrations = {
  museum: Landmark,
  park: Trees,
  shopping: Building2,
};
export default function PlaceCard({ place, selected, onSelect }) {
  const Illustration = illustrations[place.visual];
  return (
    <button
      className="relative flex w-full items-start gap-3.75 border-b border-[#e6eaf3] px-3 py-5 text-left hover:rounded-[14px] hover:bg-[#f0f3ff] aria-pressed:rounded-[14px] aria-pressed:bg-[#f0f3ff] max-[760px]:gap-3 max-[760px]:px-2"
      onClick={() => onSelect(place)}
      aria-label={`Ver acessibilidade: ${place.name}`}
      aria-pressed={selected}
    >
      <div
        className={`relative flex h-25 w-19 shrink-0 flex-col items-center justify-center rounded-[14px] [&>span]:absolute [&>span]:bottom-2 [&>span]:text-[10px] max-[760px]:h-22.5 max-[760px]:w-15.5   ${place.visual === "museum" ? "bg-[#ffd6c8]   text-[#a94326]" : place.visual === "park" ? "bg-[#dbd2ff]   text-[#5a43a7]" : "bg-[#c7e6fa]   text-[#315ca0]"}`}
        aria-hidden="true"
      >
        <Illustration size={42} strokeWidth={1.15} />
        <span>{place.number}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] tracking-[.8px] text-[#5c6d8c] uppercase">
          {place.category}
        </span>
        <h3 className="mt-1 pr-1 text-base leading-tight font-semibold text-ink max-[760px]:text-[15px]">
          {place.name}
        </h3>
        <p className="mt-1 text-xs text-[#5d6980] max-[760px]:text-[11px]">
          {place.address}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.25 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1 [&>span]:rounded [&>span]:bg-[#e9efff] [&>span]:px-1.5 [&>span]:py-1 [&>span]:text-[10px] [&>span]:text-[#294a91]">
          {place.resources.stepFree === "institution" && (
            <span>
              <Accessibility size={13} /> Rampa
            </span>
          )}
          {place.resources.toilet === "institution" && (
            <span>
              <Bath size={13} /> Banheiro
            </span>
          )}
          {place.resources.elevator === "institution" && <span>Elevador</span>}
        </div>
        <span className="mt-2 block text-[10px] text-[#5d6980]">
          Recursos informados pela instituição
        </span>
      </div>
      <ArrowUpRight className="mt-1 shrink-0 text-blue" size={18} />
    </button>
  );
}
