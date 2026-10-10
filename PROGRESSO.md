# PROGRESSO — Controle Financeiro

> Este arquivo é a memória do projeto. Ao abrir uma nova sessão, leia-o para recuperar o contexto.

## Descrição do projeto
Site responsivo de controle financeiro pessoal (receitas, despesas e resumo de saldo), construído do zero como projeto de faculdade, com acompanhamento didático passo a passo. Estilo visual inspirado no Meu Planner Financeiro (dark + laranja).

## GitHub
- Repositório: https://github.com/taylorhdrescher/Controle-Financeiro
- Identidade git configurada: Taylor Drescher <taylorhamiltondrescher24@gmail.com>
- Branch: main
- Primeiro commit: dc6ca06 (projeto inicial) + b6eac6f (README.md)

## Decisões já tomadas
- Formato: **site responsivo** (funciona em PC e celular).
- Tecnologias: HTML, CSS, JavaScript puro e localStorage. (Sem frameworks, sem servidor — mais simples para aprender.)
- Visual: **dark + laranja** (#111827 fundo, #1f2937 cartões, #f97316 destaque, texto #f9fafb), referência: meuplannerfinanceiro.com.br.
- Open Finance real: descartado para projeto acadêmico (exige registro no Banco Central, certificados e LGPD). Em aberto: Open Finance simulado OU importação de extrato em CSV.

## Tecnologias escolhidas e por quê
- **HTML**: define a estrutura da página (textos, campos, botões).
- **CSS**: cuida do visual e da responsividade (media queries).
- **JavaScript**: a lógica — ler formulários, somar, guardar e mostrar dados.
- **localStorage**: "gaveta" de memória do navegador para os dados sobreviverem ao F5 (persistência), sem servidor.

## Estrutura dos arquivos
```
controle-financeiro/
├── index.html    → estrutura da página
├── style.css     → visual (tema dark + laranja responsivo)
├── app.js        → lógica (saldo, formulários, extrato, localStorage)
├── README.md     → capa do repositório no GitHub
├── PROGRESSO.md  → memória do projeto (estado, decisões, fases)
├── TUTORIAL.md   → EBOOK: tudo que foi ensinado, microetapa por microetapa
├── TUTORIAL.pdf  → EBOOK em PDF (gerado a partir do ebook.html)
└── ebook.html    → versão formatada do tutorial (imprimível)
```

## Plano geral (fases)
1. Fase 1 — Estrutura e interface básica ✅ concluída (4 microetapas)
2. Fase 2 — Cadastro de transações ✅ concluída (6 microetapas)
3. Fase 3 — Categorias e organização
4. Fase 4 — Resumo e saldo total (verde/vermelho nos valores)
5. Fase 5 — Aperfeiçoamentos (visual refinado, metas, diferenciais como importação CSV / Open Finance simulado)

## Fase atual
Fase 3 — Categorias e organização (próxima a começar)

## Microetapas concluídas
- Fase 1 — Estrutura e interface básica
  - [x] Microetapa 1 — Criar a estrutura de arquivos
  - [x] Microetapa 2 — Montar a base do HTML (título, cabeçalho e área principal)
  - [x] Microetapa 3 — Aplicar estilo CSS responsivo básico
  - [x] Microetapa 4 — Exibir o saldo inicial na tela
- Fase 2 — Cadastro de transações
  - [x] Microetapa 1: Criar o formulário para adicionar uma receita
  - [x] Microetapa 1b: Aplicar o visual dark + laranja (Meu Planner Financeiro)
  - [x] Microetapa 2: Botão Adicionar soma o valor digitado ao saldo
  - [x] Microetapa 3: Formulário de despesas (saldo diminui)
  - [x] Microetapa 3b: Salvar o saldo no localStorage (não perde ao atualizar)
  - [x] Microetapa 4: Listar as transações na tela (extrato + array + JSON salvos)

## Conceitos já ensinados
- Arquivo, extensão (.html, .css, .js) e função de cada arquivo.
- Tags HTML em pares (abre/fecha) e aninhamento (caixas dentro de caixas).
- HTML define o lugar, CSS enfeita, JS comanda.
- Variáveis, funções, chamada de função.
- Documento → getElementById → textContent (JS conversa com o HTML).
- Formatos: toFixed(2) e replace(".", ",") para R$.
- Media query para responsividade.
- Eventos (submit), addEventListener, preventDefault, .value, Number().
- Persistência: localStorage (getItem/setItem), gaveta só guarda texto.
- Array (lista), objeto {chave: valor}, push(), length, laço for.
- Criar elementos na tela: createElement + appendChild.
- JSON: stringify (texto) e parse (lista) — ponte com a gaveta.
- Validação de entrada: if, alert(), return.
- Git/GitHub: init, config, add, commit, branch main, remote, push.

## Problemas pendentes
Nenhum.

## Histórico de bugs corrigidos
- Bug: saldo salvo não aparecia após F5. Causa: faltava a chamada inicial `exibirSaldo();` no `app.js`. Correção: adicionada a chamada no final do arquivo.
- Bug: transação sem valor era adicionada ao extrato. Causa: `Number("")` vira 0 e não havia checagem. Correção: validação `if (valor <= 0)` com `alert` e `return` nos dois formulários.

## Próxima microetapa
Fase 2 concluída. Próxima: Fase 3 — Categorias e organização.

## Observações
- Todo o conteúdo didático (explicações de cada microetapa, bugs corrigidos e GitHub) está salvo de forma permanente em **TUTORIAL.md** e regenerado em **TUTORIAL.pdf**.
- Para retomar: abrir o opencode na pasta `controle-financeiro` e dizer "Leia o PROGRESSO.md e o TUTORIAL.md e continue de onde paramos".
- Rotina Git: após cada etapa, `git add .` → `git commit -m "mensagem"` → `git push`.