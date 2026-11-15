import { Search, SlidersHorizontal, X } from "lucide-react";
import { features } from "../dados";
export default function SearchFilters({ filters, expanded, onExpand }) {
  return (
    <div className="border-b border-[#e8ebf3] p-5.5 max-[760px]:p-4.5">
      <div className="flex gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] border border-[#d6deed] bg-[#f5f7fc] p-2.5 text-[#536686]">
          <Search size={19} />
          <span className="sr-only">Buscar lugar ou endereço</span>
          <input
            placeholder="Busque um lugar ou endereço"
            value={filters.query}
            onChange={(event) => filters.setQuery(event.target.value)}
            className="min-w-0 w-full bg-transparent text-[13px] text-ink outline-offset-1 max-[760px]:text-xs"
          />
          {filters.query && (
            <button
              aria-label="Limpar busca"
              onClick={() => filters.setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </label>
        <button
          className="flex items-center gap-1.5 rounded-[7px] border border-[#d6deed] px-2.5 text-xs aria-expanded:bg-[#e5eaff] max-[760px]:px-2.25 max-[760px]:text-[11px]"
          aria-expanded={expanded}
          aria-controls="feature-filters"
          onClick={onExpand}
        >
          <SlidersHorizontal size={18} />
          <span>
            Filtros
            {filters.selectedFeatures.length > 0 &&
              ` (${filters.selectedFeatures.length})`}
          </span>
        </button>
      </div>
      <div
        className="mt-3.75 flex flex-wrap gap-1.75 max-[760px]:gap-1.25"
        aria-label="Categorias"
      >
        {["Todos", "Cultura", "Ao ar livre", "Comércio"].map((category) => (
          <button
            key={category}
            aria-pressed={filters.category === category}
            className="min-h-9.5 rounded-full border border-[#d6deed] px-3 py-1.75 text-xs aria-pressed:border-blue aria-pressed:bg-blue aria-pressed:text-white max-[760px]:px-2.5 max-[760px]:py-1.5 max-[760px]:text-[11px]"
            onClick={() => filters.setCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {expanded && (
        <fieldset id="feature-filters" className="mt-4 border-0 p-0">
          <legend className="mb-2.25 text-[13px] font-semibold">
            Recursos informados pelas instituições
          </legend>
          {features.map((feature) => (
            <label
              key={feature.id}
              className="my-2 flex items-center gap-2 text-[13px]"
            >
              <input
                type="checkbox"
                checked={filters.selectedFeatures.includes(feature.id)}
                onChange={() => filters.toggleFeature(feature.id)}
                className="size-4 accent-blue"
              />
              {feature.label}
            </label>
          ))}
          <p className="mt-2 text-xs text-[#596682]">
            O filtro considera apenas recursos publicados nas fontes
            consultadas.
          </p>
          <button
            className="inline-flex min-h-10.5 items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
            onClick={filters.reset}
          >
            Limpar todos os filtros
          </button>
        </fieldset>
      )}
    </div>
  );
}
