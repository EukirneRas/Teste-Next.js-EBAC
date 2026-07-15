# Lista de Tarefas — Next.js 15 + Testes Unitários

Aplicação de exemplo desenvolvida para o exercício de testes unitários do curso **EBAC Frontend**, usando **Next.js 15 (App Router)**, **TypeScript**, **Jest** e **Testing Library**.

## Funcionalidades

- Exibição de uma lista de tarefas vinda de uma fonte de dados simulada (`lib/tarefas.ts`, usando `Promise.resolve` para imitar uma chamada de API).
- Adição de novas tarefas por meio de um formulário controlado (`<NovaTarefa />`).
- Contagem de tarefas (total, concluídas, pendentes) via hook personalizado `useContadorDeTarefas`.
- Cobertura de testes unitários para componente, hook e página.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) + [next/jest](https://nextjs.org/docs/app/building-your-application/testing/jest)
- [Testing Library](https://testing-library.com/) (`@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`)

## Estrutura do projeto

```
next-tarefas-app/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx             # Server Component: carrega as tarefas
│   └── globals.css
├── components/
│   ├── ListaDeTarefas.tsx   # Client Component: estado da lista + contador
│   └── NovaTarefa.tsx       # Client Component: formulário controlado
├── hooks/
│   └── useContadorDeTarefas.ts   # Hook personalizado
├── lib/
│   └── tarefas.ts           # Fonte de dados simulada (Promise.resolve)
├── types/
│   └── tarefa.ts            # Tipagem Tarefa
├── tests/
│   ├── NovaTarefa.test.tsx
│   ├── useContadorDeTarefas.test.ts
│   └── page.test.tsx
├── jest.config.js
├── jest.setup.js
└── package.json
```

## Como a aplicação funciona

1. `app/page.tsx` é um **Server Component assíncrono** que chama `getTarefas()` (dados simulados localmente, sem depender de API externa) e passa a lista inicial para `<ListaDeTarefas />`.
2. `components/ListaDeTarefas.tsx` é um **Client Component** que guarda as tarefas em estado (`useState`), usa o hook `useContadorDeTarefas` para calcular total/concluídas/pendentes, e renderiza o formulário `<NovaTarefa />`.
3. `components/NovaTarefa.tsx` é um **Client Component** com um formulário controlado: valida que o título não está vazio, chama `onAdicionar(titulo)` ao submeter e limpa o campo depois.
4. `hooks/useContadorDeTarefas.ts` recebe a lista de tarefas e retorna `{ total, concluidas, pendentes }`, memoizado com `useMemo`.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18.18 ou superior (recomendado 20+)
- npm (vem junto com o Node.js)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd next-tarefas-app
npm install
```

> **Usuários de Windows / PowerShell:** os comandos acima funcionam normalmente no PowerShell. Se preferir usar `cd` com caminhos com espaço, use aspas, por exemplo: `cd "C:\Users\Seu Usuario\projetos\next-tarefas-app"`.

## Rodando a aplicação em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Rodando os testes

Executar toda a suíte de testes:

```bash
npm test
```

Executar em modo watch (útil durante o desenvolvimento):

```bash
npm run test:watch
```

Executar com relatório de cobertura:

```bash
npm run test:coverage
```

### O que é testado

- **`tests/NovaTarefa.test.tsx`** — Renderização do input/botão, botão desabilitado quando o campo está vazio, habilitação ao digitar, chamada de `onAdicionar` com o valor correto ao submeter, limpeza do campo após o envio, e que títulos vazios/só com espaços não disparam `onAdicionar`.
- **`tests/useContadorDeTarefas.test.ts`** — Testa o hook isoladamente com `renderHook`: lista vazia, contagem de concluídas/pendentes, e atualização dos valores ao re-renderizar com uma nova lista.
- **`tests/page.test.tsx`** — Renderiza o Server Component `Home` (chamando a função assíncrona diretamente e passando o JSX resultante para `render`), verifica a lista de tarefas vinda dos dados simulados, o contador inicial, e o fluxo completo de adicionar uma tarefa pela UI.

## Build de produção

```bash
npm run build
npm start
```

## Notas de implementação

- Os dados de tarefas ficam em um array local em `lib/tarefas.ts`, retornado via `Promise.resolve` para simular uma chamada assíncrona (ex.: uma API), evitando dependências externas que poderiam expirar ou instabilizar o deploy (ex.: na Vercel).
- Os testes do Server Component não usam mock de API externa, pois os dados já são simulados localmente — testamos a integração real entre `page.tsx`, `lib/tarefas.ts` e os componentes filhos.

## 🚀 Deploy

Aplicação publicada: https://teste-next-js-ebac.vercel.app/

## ⚙️ CI/CD

Este projeto conta com uma pipeline de integração e entrega contínua via GitHub Actions.

Para verificar a execução:
1. Acesse a aba **Actions** no repositório do GitHub.
2. Clique na execução mais recente do workflow **CI/CD Pipeline**.
3. Veja o status de cada etapa (lint, testes, build e deploy) e os logs de cada job (`build-and-test` e `deploy`).

O deploy automático ocorre a cada push na branch `main`, após o job de build e testes ser concluído com sucesso.


# next-tarefas-app — Otimização de Performance

Aplicativo de lista de tarefas construído em **Next.js 15 (App Router)** com **TypeScript**, testado com **Jest + Testing Library**, e com pipeline de **CI/CD via GitHub Actions** para deploy automático no **Vercel**.

> Repositório: [`EukirneRas/Teste-Next.js-EBAC`](https://github.com/EukirneRas/Teste-Next.js-EBAC)

---

## 📋 Descrição do projeto

O `next-tarefas-app` é uma aplicação de gerenciamento de tarefas (task list) que utiliza:
- Server Components e Client Components do App Router
- Um hook customizado (`useContadorDeTarefas`)
- Suíte de testes com 12 casos cobrindo componentes e hook
- Pipeline de CI/CD que roda build, testes e deploy automatizado a cada push

---

## 🔧 Configuração de lint corrigida

Antes de iniciar a análise de performance, foi necessário corrigir a configuração do ESLint, que estava gerando **4004 problemas** (138 erros, 3866 warnings) — quase todos causados por arquivos que **não deveriam ser analisados**.

### Causa raiz
O arquivo `eslint.config.mjs` não excluía a pasta de build (`.next/`), fazendo o linter analisar código minificado/gerado automaticamente pelo Next.js, além de conter dois `export default` conflitantes (erro de sintaxe `Identifier '.default' has already been declared`).

### Correções aplicadas

**1. Consolidação do `eslint.config.mjs`**, unificando em um único `export default` e adicionando bloco de exclusões:

```js
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "next-env.d.ts",
      "jest.config.cjs",
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
```

**2. Renomeação de `jest.config.js` → `jest.config.cjs`**, deixando explícito que o arquivo usa CommonJS, e adicionado à lista de `ignores` (por ser um arquivo de configuração, não código de produção).

### Resultado

| Antes | Depois |
|---|---|
| 4004 problemas (138 erros, 3866 warnings) | 0 problemas |

Essa limpeza foi um pré-requisito importante para a etapa seguinte: sem ela, ferramentas de análise e o próprio processo de build ficavam poluídos com ruído de arquivos gerados, dificultando identificar problemas reais no código-fonte (`app/`, `components/`, `hooks/`).

---

## 🚦 Análise de Performance (Lighthouse / DevTools)

> ⏳ **Seção em andamento** — preencher após rodar o build de produção e o relatório Lighthouse.

### Como gerar o relatório
```powershell
npm run build
npm run start
```
Em seguida, abrir o Chrome DevTools → aba **Lighthouse** → modo **Navigation** → dispositivo **Mobile** → gerar relatório.

### Relatório inicial (antes das otimizações)
- [ ] Print da pontuação (Performance / Accessibility / Best Practices / SEO)
- [ ] Gargalos identificados:
  - [ ] Imagens não otimizadas
  - [ ] JavaScript bloqueando renderização
  - [ ] Requisições desnecessárias
  - [ ] Outros: _______

### Otimizações aplicadas

| Técnica | Status | Observações |
|---|---|---|
| Imagens em `.webp`/`.avif` + `next/image` | ⏳ Pendente | |
| `loading="lazy"` em imagens abaixo da dobra | ⏳ Pendente | |
| Minificação HTML/CSS/JS | ✅ Automático via `next build` | Confirmado em produção (`next start`) |
| Remoção de código não utilizado | ✅ Concluído | Configuração de lint corrigida (ver seção acima); 0 erros/warnings no código-fonte |
| Imports enxutos de bibliotecas | ⏳ Pendente | |

### Relatório final (depois das otimizações)
- [ ] Print da pontuação atualizada
- [ ] Comparativo antes/depois

### Resumo de impacto
_A preencher com as métricas reais após a reanálise — destacar quais mudanças trouxeram maior ganho (ex.: otimização de imagens costuma ter o maior impacto em LCP)._

---

## 🧪 Testes

Suíte completa com Jest + Testing Library, cobrindo Server Component, Client Components e o hook `useContadorDeTarefas` (12 testes, 100% passando).

```powershell
npm run test
```

## 🚀 CI/CD

Pipeline via GitHub Actions:
- **build-and-test**: instala dependências, roda lint, testes e build a cada push
- **deploy**: publica automaticamente no Vercel após o job anterior passar

🔗 Deploy: _adicionar link do projeto no Vercel aqui_
