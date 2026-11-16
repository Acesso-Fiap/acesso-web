# Registro de Uso de IA no Projeto AcessoWeb

Este documento registra como as ferramentas de inteligência artificial foram utilizadas para **correção de bugs e ajustes** no projeto AcessoWeb. O projeto foi desenvolvido manualmente; a IA atuou como apoio em depuração, revisão e validação pontual.

---

## Ferramentas Utilizadas

### 1. Claude (Anthropic) — Correção de Bugs e Code Review

**Modelo**: Claude Opus 5.5 (via Claude Code CLI)  
**Período**: Novembro 2026  
**Papel**: Depuração, revisão de código, ajustes pontuais

#### Correções realizadas

| Arquivo / Área                       | Bug / Problema                                                                                | Correção aplicada                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `src/hooks/useReports.js`            | Race condition no optimistic update: exclusão falhava mas UI já tinha removido o item         | Rollback automático no `catch` + `setReports(prev => prev.filter(...))` somente após `await reports.remove()` confirmar |
| `src/hooks/useReports.js`            | `user` podia ser `null` ao chamar `save()` antes do `getUser(create: true)` resolver          | Garantir `await getUser(true)` no início de `save()` e `remove()`; guardar `userId` no estado do hook                   |
| `src/components/MapPanel.jsx`        | Memory leak: listeners de `click` e `moveend` no Leaflet não removidos no `useEffect` cleanup | Adicionar `return () => { map.off('click', onClick); map.off('moveend', onMoveEnd); }`                                  |
| `src/components/MapPanel.jsx`        | Marcador da rota (`routePlace`) duplicava ao alternar views                                   | Chave única `key={place.id}` + condição para não adicionar `routePlace` se já estiver em `places`                       |
| `src/components/RouteComparison.jsx` | Erro silencioso quando OSRM retorna `code !== 'Ok'` (ex.: coordenadas fora de área)           | Tratamento de `response.code` + fallback de mensagem amigável + `console.error` estruturado                             |
| `src/supabaseClient.js`              | `VITE_SUPABASE_PUBLISHABLE_KEY` não existia no `.env.local` (só `ANON_KEY`)                   | Fallback para `VITE_SUPABASE_ANON_KEY` + erro claro se nenhuma das duas definida                                        |
| `src/App.jsx`                        | Modal de rotas não fechava ao clicar em "Iniciar trajeto"                                     | `onStart` chama `setModal(null)` antes de `setRoutePlace()`                                                             |
| `src/components/ReportForm.jsx`      | Validação permitia envio vazio se usuário apagasse texto após digitar                         | `disabled={busy                                                                                                         |     | !description.trim()}`no botão +`required`no`textarea` |
| `eslint.config.js`                   | Regras `react-hooks/exhaustive-deps` e `react-refresh/only-export-components` não aplicadas   | Adicionar plugins `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh` na config flat                            |
| `src/components/PlaceCard.jsx`       | `onSelect` disparava duas vezes (evento no card + no botão interno)                           | `onClick` no card com `e.currentTarget === e.target` guard + remover `onClick` do botão interno                         |

#### Revisões de qualidade (não-bugs)

- Remoção de `console.log` de debug em `useReports.js`, `MapPanel.jsx`, `RouteComparison.jsx`
- Padronização de imports (ordem: React, libs, componentes, hooks, utils)
- Ajuste de tipos JSDoc em `dados.js` (`Place`, `ResourceStatus`, `Report`)
- Simplificação de `filterPlaces` em `validacao.js` (early return + `every`)

---

### 2. Astra (GPT / OpenAI) — Validação Visual e Testes de Integração

**Modelo**: GPT-4o (via interface Astra)  
**Período**: Novembro 2026  
**Papel**: Verificação manual de funcionamento, geração de assets visuais já existentes

#### Atividades realizadas

| Atividade                                  | Detalhes                                                                                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Verificação do mapa (Leaflet)**          | Confirmou: tiles OSM carregam sem CORS, marcadores nas 3 coordenadas corretas, polyline de rota desenhada após clicar em "Explorar caminhos", `fitBounds` inclui estação + destino                                                               |
| **Teste de auth anônimo Supabase**         | Verificou no painel Supabase: _Anonymous Sign-Ins_ habilitado; `signInAnonymously()` retorna `user.id` consistente entre reloads; RLS permite insert/select próprio                                                                              |
| **Validação de build**                     | `npm run build` gera `dist/` com assets otimizados; `npm run preview` serve corretamente; imagens em `public/images/` copiadas para `dist/images/`                                                                                               |
| **Assets visuais (já existentes no repo)** | Logos `logo-acesso.png` / `logo-acesso-marca.png` e ilustração `cidade-para-todos.png` já estavam em `public/images/` — **não foram gerados agora**; apenas confirmados como presentes e referenciados corretamente no `Header.jsx` e `Hero.jsx` |

> **Nota**: As imagens já existiam no repositório (commits anteriores). A IA apenas validou que estão no lugar correto e com nomes esperados pelo código.

## Como reproduzir as correções validadas

```bash
# 1. Instale dependências
npm install

# 2. Configure .env.local
# VITE_SUPABASE_URL=https://<projeto>.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=<chave>   # ou VITE_SUPABASE_ANON_KEY

# 3. Rode e teste os cenários corrigidos
npm run dev
# - Abra http://localhost:5173
# - Navegue entre views (explore → reports → about) → sem erros de console
# - Clique em lugar → PlaceDetail abre → "Explorar caminhos" → rota desenha no mapa
# - "Compartilhe seu olhar" → preencha e salve → aparece em Relatos
# - Edite um relato próprio → salva
# - Exclua um relato próprio → remove da lista (rollback se falhar)
# - Recarregue a página → usuário anônimo mantido, relatos persistem

# 4. Build e lint
npm run lint   # deve passar sem warnings
npm run build  # gera dist/ sem erros
```

---
