import { Eye, HeartHandshake, MapPin } from "lucide-react";
export default function About() {
  return (
    <section className="mt-7.5 min-h-[80vh] rounded-t-[40px] bg-cream px-16 py-15 max-[760px]:mt-5.5 max-[760px]:px-5.5 max-[760px]:py-8.75">
      <p className="text-[11px] font-bold tracking-[1.7px]">
        GLOBAL SOLUTION · SÃO PAULO
      </p>
      <h1 className="my-5 text-[46px] leading-tight font-medium tracking-[-1.7px] max-[760px]:text-4xl">
        Autonomia começa
        <br />
        com informação.
      </h1>
      <p className="max-w-162.5 leading-[1.8] text-[#52617e]">
        Uma entrada com rampa ajuda. Conhecer o caminho até ela também. O Acesso
        de Ponta a Ponta reúne informações sobre lugares e convida a comunidade
        a observar o trajeto.
      </p>
      <div className="mt-13.75 grid grid-cols-3 gap-4.5 max-[760px]:grid-cols-1">
        <article className="rounded-3xl bg-[#cce8f7] p-6.5 even:bg-lilac last:bg-[#ffe8a0]">
          <MapPin />
          <h2 className="mt-4.5 mb-2.5 text-xl font-semibold">Começar perto</h2>
          <p className="text-sm leading-[1.8] text-[#35456c]">
            Nosso recorte é o entorno da estação Trianon–Masp: três destinos com
            informações de visita e acessibilidade reunidas a partir de fontes
            oficiais na internet.
          </p>
        </article>
        <article className="rounded-3xl bg-[#cce8f7] p-6.5 even:bg-lilac last:bg-[#ffe8a0]">
          <Eye />
          <h2 className="mt-4.5 mb-2.5 text-xl font-semibold">
            Mostrar o que sabemos
          </h2>
          <p className="text-sm leading-[1.8] text-[#35456c]">
            Cada recurso mostra o que está publicado nas fontes consultadas.
            Fontes institucionais e relatos são apresentados separadamente, sem
            transformar ausência de informação em garantia de acesso.
          </p>
        </article>
        <article className="rounded-3xl bg-[#cce8f7] p-6.5 even:bg-lilac last:bg-[#ffe8a0]">
          <HeartHandshake />
          <h2 className="mt-4.5 mb-2.5 text-xl font-semibold">
            ODS 10 - Redução das desigualdades
          </h2>
          <p className="text-sm leading-[1.8] text-[#35456c]">
            Esta é a ODS priorizada pelo projeto. Reunir informações de
            acessibilidade em um só lugar busca reduzir barreiras de informação
            e apoiar a autonomia de pessoas com deficiência e mobilidade
            reduzida. Essa é a contribuição pretendida; a pesquisa documental
            não mede o impacto na vida dos usuários.
          </p>
        </article>
      </div>
      <div className="mt-11.25 mb-6.25 rounded-[25px] bg-[#e9edfb] p-7.5">
        <h2 className="mt-4.5 mb-2.5 text-xl font-semibold">
          Pesquisa online, com fontes abertas.
        </h2>
        <p className="text-sm leading-[1.8] text-[#35456c]">
          Consultamos sites dos estabelecimentos, do Metrô e da Prefeitura em
          11/11/2026. As fichas incluem fontes, horários e canais de
          atendimento. Relatos da comunidade são contribuições independentes.
        </p>
      </div>
      <p className="my-3 text-[11px] leading-[1.7] text-[#5b6880]">
        Protótipo acadêmico · FIAP Global Solution 2026.2
      </p>
    </section>
  );
}
