import { ArrowUpRight } from "lucide-react";
export default function Header({ view, onView, onReport }) {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed -top-28 left-3 z-9999 rounded-lg bg-white p-4 text-ink focus:top-3"
      >
        Pular para o conteúdo
      </a>
      <header className="relative z-500 mx-auto mt-5.5 flex h-22 w-[calc(100%-96px)] max-w-352 items-center justify-between gap-6 rounded-[22px] bg-[#fffefb] px-6 max-[1100px]:w-[calc(100%-48px)] max-[1100px]:gap-4 max-[1100px]:px-5 max-[760px]:mt-3.5 max-[760px]:h-auto max-[760px]:w-[calc(100%-28px)] max-[760px]:flex-wrap max-[760px]:gap-3.75 max-[760px]:rounded-[20px] max-[760px]:px-4.5 max-[760px]:pt-4.5">
        <a
          className="block w-[min(210px,20vw)] shrink-0 max-[760px]:w-[min(155px,36vw)]"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onView("explore");
          }}
          aria-label="Acesso de Ponta a Ponta, início"
        >
          <img
            className="block h-auto w-full object-contain"
            src={import.meta.env.BASE_URL + "images/logo-acesso.png"}
            alt="Acesso. De ponta a ponta"
            width="1613"
            height="500"
          />
        </a>
        <nav
          aria-label="Navegação principal"
          className="flex h-full items-center gap-3 max-[1100px]:gap-0.5 max-[760px]:order-3 max-[760px]:h-12 max-[760px]:w-full max-[760px]:justify-between max-[760px]:gap-1 max-[760px]:pb-2.5"
        >
          <button
            className={`min-h-11 rounded-full px-4.5 py-3 text-sm text-[#485575] max-[1100px]:px-3 max-[1100px]:text-xs max-[760px]:min-h-9.5 max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-[11px] ${view === "explore" ? "bg-[#eaf0ff] text-ink! font-semibold" : ""}`}
            onClick={() => onView("explore")}
          >
            Explorar a região
          </button>
          <button
            className={`min-h-11 rounded-full px-4.5 py-3 text-sm text-[#485575] max-[1100px]:px-3 max-[1100px]:text-xs max-[760px]:min-h-9.5 max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-[11px] ${view === "reports" ? "bg-[#eaf0ff] text-ink! font-semibold" : ""}`}
            onClick={() => onView("reports")}
          >
            Observações
          </button>
          <button
            className={`min-h-11 rounded-full px-4.5 py-3 text-sm text-[#485575] max-[1100px]:px-3 max-[1100px]:text-xs max-[760px]:min-h-9.5 max-[760px]:px-2.5 max-[760px]:py-2 max-[760px]:text-[11px] ${view === "about" ? "bg-[#eaf0ff] text-ink! font-semibold" : ""}`}
            onClick={() => onView("about")}
          >
            O projeto
          </button>
        </nav>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5.5 py-3 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 bg-blue text-white hover:bg-[#203caa] pr-2.5 pl-5.5 [&_svg]:size-8 [&_svg]:rounded-full [&_svg]:bg-butter [&_svg]:p-1.5 [&_svg]:text-ink max-[760px]:min-h-10.5 max-[760px]:gap-2 max-[760px]:py-1.75 max-[760px]:pr-2 max-[760px]:pl-3.5 max-[760px]:text-xs max-[760px]:[&_svg]:size-6.75"
          onClick={onReport}
        >
          Contribuir <ArrowUpRight size={17} />
        </button>
      </header>
    </>
  );
}
