import { MapPinned, ScanEye, MessagesSquare, ArrowUpRight } from "lucide-react";
export default function JourneyIntro({ onReport }) {
  return (
    <section
      className="rounded-t-[50px] bg-cream px-16 pt-18 pb-16 max-[1100px]:px-8 max-[760px]:rounded-t-4xl max-[760px]:px-5.5 max-[760px]:pt-10.5 max-[760px]:pb-7.5"
      aria-labelledby="journey-title"
    >
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[1.7px]">
          DE PONTA A PONTA, COM VOCÊ.
        </p>
        <h2
          id="journey-title"
          className="my-4.5 text-[clamp(34px,4.1vw,60px)] leading-[1.1] font-medium tracking-[-2.5px] [&>span]:text-blue max-[760px]:text-[35px] max-[760px]:tracking-[-1.5px]"
        >
          Um lugar. Um caminho.
          <br />
          <span>Mais possibilidades.</span>
        </h2>
        <p className="flex-1 text-sm leading-[1.7] text-[#35456c]">
          A acessibilidade está nos detalhes. Vamos olhar para eles juntos?
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4.5 max-[760px]:mt-7 max-[760px]:grid-cols-1 max-[760px]:gap-3.5">
        <article className="flex flex-col rounded-[26px] p-7 max-[1100px]:p-5.75 max-[760px]:rounded-[23px] max-[760px]:p-6.25 bg-[#cce8f7]">
          <div className="flex items-center justify-between [&>span]:text-[10px] [&>span]:font-bold [&>span]:tracking-[1px]">
            <span>01 / DESCUBRA</span>
            <MapPinned size={28} />
          </div>
          <h3 className="mt-7.5 mb-4 text-[31px] leading-[1.12] font-[550] tracking-[-1px] max-[1100px]:text-[26px] max-[760px]:mt-5 max-[760px]:text-[30px]">
            Seu próximo <br />
            destino.
          </h3>
          <p className="flex-1 text-sm leading-[1.7] text-[#35456c]">
            Cultura, natureza e encontros. Explore o nosso recorte na Paulista.
          </p>
          <a
            href="#explorar"
            className="mt-6.25 flex min-h-11 items-center justify-between border-t border-ink/15 pt-4.5 text-left text-[13px] font-semibold underline-offset-4 hover:underline max-[760px]:mt-4.5"
          >
            Encontrar um lugar <ArrowUpRight size={19} />
          </a>
        </article>
        <article className="flex flex-col rounded-[26px] p-7 max-[1100px]:p-5.75 max-[760px]:rounded-[23px] max-[760px]:p-6.25 bg-lilac">
          <div className="flex items-center justify-between [&>span]:text-[10px] [&>span]:font-bold [&>span]:tracking-[1px]">
            <span>02 / CONHEÇA</span>
            <ScanEye size={28} />
          </div>
          <h3 className="mt-7.5 mb-4 text-[31px] leading-[1.12] font-[550] tracking-[-1px] max-[1100px]:text-[26px] max-[760px]:mt-5 max-[760px]:text-[30px]">
            Os detalhes <br />
            fazem diferença.
          </h3>
          <p className="flex-1 text-sm leading-[1.7] text-[#35456c]">
            Veja recursos de acessibilidade, fontes oficiais e informações para
            planejar sua visita.
          </p>
          <a
            href="#explorar"
            className="mt-6.25 flex min-h-11 items-center justify-between border-t border-ink/15 pt-4.5 text-left text-[13px] font-semibold underline-offset-4 hover:underline max-[760px]:mt-4.5"
          >
            Consultar os recursos <ArrowUpRight size={19} />
          </a>
        </article>
        <article className="flex flex-col rounded-[26px] p-7 max-[1100px]:p-5.75 max-[760px]:rounded-[23px] max-[760px]:p-6.25 bg-[#ffe8a0]">
          <div className="flex items-center justify-between [&>span]:text-[10px] [&>span]:font-bold [&>span]:tracking-[1px]">
            <span>03 / COMPARTILHE</span>
            <MessagesSquare size={28} />
          </div>
          <h3 className="mt-7.5 mb-4 text-[31px] leading-[1.12] font-[550] tracking-[-1px] max-[1100px]:text-[26px] max-[760px]:mt-5 max-[760px]:text-[30px]">
            Seu olhar <br />
            também conta.
          </h3>
          <p className="flex-1 text-sm leading-[1.7] text-[#35456c]">
            Encontrou uma facilidade ou uma barreira? Sua observação pode ajudar
            a próxima pessoa.
          </p>
          <button
            onClick={onReport}
            className="mt-6.25 flex min-h-11 items-center justify-between border-t border-ink/15 pt-4.5 text-left text-[13px] font-semibold underline-offset-4 hover:underline max-[760px]:mt-4.5"
          >
            Quero contribuir <ArrowUpRight size={19} />
          </button>
        </article>
      </div>
    </section>
  );
}
