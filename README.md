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

Aplicação publicada: https://seu-link-vercel.vercel.app

## ⚙️ CI/CD

Este projeto conta com uma pipeline de integração e entrega contínua via GitHub Actions.

Para verificar a execução:
1. Acesse a aba **Actions** no repositório do GitHub.
2. Clique na execução mais recente do workflow **CI/CD Pipeline**.
3. Veja o status de cada etapa (lint, testes, build e deploy) e os logs de cada job (`build-and-test` e `deploy`).

O deploy automático ocorre a cada push na branch `main`, após o job de build e testes ser concluído com sucesso.