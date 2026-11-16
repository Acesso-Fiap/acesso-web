# AcessoWeb — Mapa de Acessibilidade na Avenida Paulista

Aplicação web para explorar a acessibilidade de locais próximos à estação **Trianon–Masp** (Linha 2–Verde do Metrô de São Paulo). O projeto permite consultar recursos de acesso (rampas, elevadores, banheiros acessíveis, cardápios acessíveis), visualizar no mapa e compartilhar observações da comunidade.

## Funcionalidades

- **Explorar lugares**: Lista de locais com filtros por categoria e recursos de acessibilidade
- **Mapa interativo**: Visualização com Leaflet mostrando localização, rotas a pé e estações de metrô
- **Detalhes de acessibilidade**: Informações verificadas por fontes institucionais (datas de checagem, notas de recurso, contatos)
- **Relatos da comunidade**: Envio, edição e exclusão de observações sobre calçadas, travessias e barreiras — autenticado via Supabase (anon sign-in)
- **Comparação de rotas**: Cálculo de trajetos a pé da estação até o destino (OSRM)

## Stack

| Tecnologia           | Uso                             |
| -------------------- | ------------------------------- |
| React 19 + Vite      | Framework e build               |
| TailwindCSS v4       | Estilização via plugin Vite     |
| Leaflet              | Mapa interativo                 |
| Supabase             | Auth anônimo + banco de relatos |
| OSRM (público)       | Roteamento a pé                 |
| Lucide React         | Ícones                          |
| ESLint (flat config) | Qualidade de código             |

## Estrutura de Pastas

```
src/
├── components/       # UI: Header, Hero, MapPanel, PlaceCard, PlaceDetail, ReportForm, ReportsList, RouteComparison, SearchFilters, Modal, Footer, About, JourneyIntro
├── hooks/
│   ├── usePlaces.js  # Filtros e busca local (dados estáticos)
│   └── useReports.js # CRUD de relatos no Supabase
├── dados.js          # Base de conhecimento: estação, features, lugares, relatos legados
├── validacao.js      # Lógica de filtro de lugares
├── supabaseClient.js # Cliente Supabase + helpers de sessão anônima
├── App.jsx           # Roteamento de views (explore / reports / about) + estado global de modais
├── main.jsx          # Entrada + providers
└── index.css         # Estilos globais + tokens Tailwind
```

## Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<sua-chave-anon-ou-publishable>
```

> **Nota**: O projeto usa `VITE_SUPABASE_PUBLISHABLE_KEY` (preferencial) ou `VITE_SUPABASE_ANON_KEY` como fallback. O Supabase deve ter **Anonymous Sign-Ins habilitado** (Authentication → Providers → Email → "Enable anonymous sign-ins").

### Tabela `reports` (Supabase)

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  place_id text not null,
  type text not null,
  description text not null,
  observed_at date not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table reports enable row level security;

create policy "Users can insert their own reports"
  on reports for insert
  with check (auth.uid() = user_id);

create policy "Users can view all reports"
  on reports for select
  using (true);

create policy "Users can update their own reports"
  on reports for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reports"
  on reports for delete
  using (auth.uid() = user_id);
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Build de produção
npm run lint     # ESLint
npm run preview  # Preview do build
```

## Dados Inclusos

- **Estação de referência**: Trianon–Masp (coordenadas, horários, link oficial)
- **3 lugares** com fichas completas de acessibilidade:
  1. MASP (Cultura)
  2. Parque Trianon (Ao ar livre)
  3. Shopping Cidade São Paulo (Comércio)
- **4 recursos** mapeados: rampa, banheiro acessível, elevador, cardápio acessível
- **Relatos legados** de exemplo (somente leitura)

## Fontes e Verificação

Cada lugar possui:

- `checked`: data da última checagem (formato DD/MM/YYYY)
- `sources[]`: URLs das fontes institucionais consultadas
- `resourceNotes`: notas por recurso explicando o que a fonte diz / não diz

> **Aviso**: As informações refletem o que foi publicado pelas instituições nas datas indicadas. Condições reais podem variar. Consulte os contatos e fontes antes da visita.

## Integrantes

| Nome                       | RM       |
| -------------------------- | -------- |
| Kaio Hiroki Kinoshita      | RM569127 |
| Leonardo Daniel dos Santos | RM571092 |
| Matheus Dionisio Cintra    | RM569844 |

## Licença

Projeto educacional / de demonstração. Imagens e marcas dos locais pertencem aos respectivos proprietários.
