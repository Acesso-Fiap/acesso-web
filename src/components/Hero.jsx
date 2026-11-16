import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
export default function Hero() {
  return (
    <section
      className="overflow-hidden px-16 py-15.5 max-[1100px]:px-10 max-[1100px]:pt-12.5 max-[760px]:px-5.5 max-[760px]:pt-10.5"
      aria-labelledby="hero-title"
    >
      <div className="relative z-1 text-center">
        <p className="text-[11px] font-bold tracking-[1.7px] mb-5.5 flex items-center justify-center gap-2 text-[#284370] max-[760px]:mx-auto max-[760px]:mb-5 max-[760px]:max-w-75 max-[760px]:gap-1.5 max-[760px]:text-[9px] max-[760px]:tracking-[.8px]">
          <span className="inline-block size-1.5 shrink-0 rounded-full bg-blue" />{" "}
          DIFERENTES PESSOAS. UMA CIDADE PARA COMPARTILHAR.
        </p>
        <h1
          id="hero-title"
          className="relative mx-auto mb-6 w-fit text-[clamp(48px,6.7vw,102px)] leading-[1.01] font-[550] tracking-[-5px] [&>span]:text-blue max-[1100px]:text-[clamp(48px,7vw,78px)] max-[1100px]:tracking-[-3.5px] max-[760px]:mb-5 max-[760px]:text-[clamp(34px,7.6vw,56px)] max-[760px]:leading-[1.09] max-[760px]:tracking-[-1.8px]"
        >
          A cidade é de todos.
          <br />
          <span>O caminho também.</span>
          <img
            className="absolute -right-15 top-0.5 block h-auto w-14.5 rotate-16 object-contain max-[1100px]:-right-8 max-[1100px]:-top-3.25 max-[1100px]:w-9.5 max-[760px]:-right-2.25 max-[760px]:-top-4 max-[760px]:w-6"
            src={import.meta.env.BASE_URL + "images/logo-acesso-marca.png"}
            alt=""
            aria-hidden="true"
            width="1132"
            height="1030"
          />
        </h1>
        <p className="mx-auto max-w-142.5 text-base leading-[1.65] text-[#354e76] max-[760px]:max-w-105 max-[760px]:text-sm">
          Cada pessoa tem seu jeito de chegar. Encontre informações de
          acessibilidade e descubra novas possibilidades na Paulista.
        </p>
        <div
          className="mx-auto mt-5 flex w-fit max-w-[min(100%,520px)] items-center justify-center gap-3 rounded-[18px] border border-blue/30 bg-[#fffefb] py-2.25 pr-4 pl-2.5 text-left max-[760px]:w-full max-[760px]:pr-2.75"
          aria-label="ODS escolhida para o projeto: 10, Redução das desigualdades"
        >
          <span
            className="grid h-10.5 w-10.5 shrink-0 place-content-center rounded-xl bg-blue text-center text-[9px] leading-none font-bold text-white"
            aria-hidden="true"
          >
            ODS
            <strong className="text-[19px]">10</strong>
          </span>
          <span className="block">
            <strong className="block text-xs text-ink max-[760px]:text-[11px]">
              ODS escolhida: Redução das desigualdades
            </strong>
            <span className="mt-0.5 block text-[11px] text-[#53617d] max-[760px]:text-[10px]">
              Informação acessível apoia mais autonomia e participação.
            </span>
          </span>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 mt-5.5 bg-blue pr-2.5 pl-6 text-[15px] text-white hover:bg-[#203caa] max-[760px]:mt-5 max-[760px]:text-sm"
          href="#explorar"
        >
          Vamos explorar?{" "}
          <span className="grid size-9 place-items-center rounded-full bg-butter text-ink">
            <ArrowDown size={21} />
          </span>
        </a>
      </div>
      <div className="relative mx-auto mt-10.5 w-full max-w-275 max-[760px]:mt-8">
        <img
          className="block h-auto w-full rounded-t-[44px] rounded-b-[100px] max-[760px]:rounded-t-3xl max-[760px]:rounded-b-[40px]"
          src={import.meta.env.BASE_URL + "images/cidade-para-todos.png"}
          width="1536"
          height="1024"
          fetchPriority="high"
          alt="Ilustração de pessoas com diferentes formas de mobilidade compartilhando a Paulista: uma mulher em cadeira de rodas, um homem com bengala branca, uma pessoa com prótese, uma idosa e uma família com carrinho de bebê."
        />
        <span className="absolute flex items-center gap-3 rounded-[19px] bg-[#fffdf6] px-5.5 py-4.25 text-[15px] font-semibold shadow-[0_7px_0_#172a5910] top-[14%] -left-8.75 -rotate-7 leading-[1.3] max-[760px]:hidden">
          <Sparkles size={23} /> Mais autonomia.
          <br />
          Mais encontros.
        </span>
        <span className="absolute flex items-center gap-3 rounded-[19px] bg-[#fffdf6] px-5.5 py-4.25 text-[15px] font-semibold shadow-[0_7px_0_#172a5910] -right-6.75 bottom-[10%] rotate-5 max-[760px]:right-2 max-[760px]:-bottom-2.25 max-[760px]:gap-1.5 max-[760px]:rounded-xl max-[760px]:px-3 max-[760px]:py-2.25 max-[760px]:text-[10px] max-[760px]:[&_svg]:size-3.5">
          <MapPin size={21} /> Paulista, São Paulo <ArrowUpRight size={18} />
        </span>
      </div>
    </section>
  );
}
