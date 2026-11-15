import { ArrowUpRight } from "lucide-react";
export default function Footer({ onReport }) {
  return (
    <>
      <section className="relative flex items-center justify-between gap-6 overflow-hidden rounded-t-[44px] bg-blue px-20 py-18.75 text-white [&>div]:relative [&>div]:z-1 [&>button]:relative [&>button]:z-1 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6.5 max-[760px]:rounded-t-[30px] max-[760px]:px-6 max-[760px]:py-11.25">
        <img
          className="absolute -top-15.5 right-[15%] h-auto w-[min(370px,32vw)] rotate-16 object-contain opacity-20 max-[760px]:top-7 max-[760px]:-right-4.5 max-[760px]:w-[min(205px,50vw)]"
          src={import.meta.env.BASE_URL + "images/logo-acesso-marca.png"}
          alt=""
          aria-hidden="true"
          width="1132"
          height="1030"
        />
        <div>
          <span className="text-[11px] font-bold tracking-[1.7px]">
            UMA CIDADE CONSTRUÍDA EM CONJUNTO
          </span>
          <h2 className="my-5.5 text-[clamp(38px,5.2vw,76px)] leading-[1.05] font-medium tracking-[-2.8px] [&_span]:text-butter max-[760px]:text-[42px] max-[760px]:tracking-[-1.7px]">
            Seu olhar abre
            <br />
            novos caminhos<span>.</span>
          </h2>
          <p className="max-w-122.5 text-[15px] text-[#e7ecff] max-[760px]:text-sm">
            Viu uma rampa, uma barreira ou algo que pode ajudar? Compartilhe.
          </p>
        </div>
        <button
          className="whitespace-nowrap [&_svg]:size-8 [&_svg]:rounded-full [&_svg]:bg-butter [&_svg]:p-1.5 [&_svg]:text-ink inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-white text-ink"
          onClick={onReport}
        >
          Quero contribuir <ArrowUpRight size={18} />
        </button>
      </section>
      <footer className="flex items-center gap-6.25 bg-ink px-16 py-7.5 text-xs text-[#dfe7ff] [&>span:last-child]:ml-auto max-[760px]:flex-wrap max-[760px]:gap-x-3.75 max-[760px]:gap-y-2 max-[760px]:px-6 max-[760px]:py-7 max-[760px]:text-[11px] max-[760px]:[&>span:last-child]:ml-0 max-[760px]:[&>span:last-child]:w-full">
        <img
          className="block h-8 w-8.75 shrink-0 object-contain"
          src={import.meta.env.BASE_URL + "images/logo-acesso-marca.png"}
          alt="Símbolo do Acesso de Ponta a Ponta"
          width="1132"
          height="1030"
        />
        <span>De ponta a ponta, com mais autonomia.</span>
        <span>Projeto acadêmico · Global Solution 2026</span>
      </footer>
    </>
  );
}
