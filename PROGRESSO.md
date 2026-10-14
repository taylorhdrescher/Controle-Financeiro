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
├── app.js        → lógica (saldo, formulários, extrato, resumo, CSV, localStorage)
├── exemplo-extrato.csv → arquivo de exemplo para testar a importação CSV
├── README.md     → capa do repositório no GitHub
├── PROGRESSO.md  → memória do projeto (estado, decisões, fases)
├── TUTORIAL.md   → EBOOK: tudo que foi ensinado, microetapa por microetapa
├── TUTORIAL.pdf  → EBOOK em PDF (gerado a partir do ebook.html)
└── ebook.html    → versão formatada do tutorial (imprimível)
```

## Plano geral (fases)
1. Fase 1 — Estrutura e interface básica ✅ concluída (4 microetapas)
2. Fase 2 — Cadastro de transações ✅ concluída (6 microetapas)
3. Fase 3 — Categorias e organização ✅ concluída (3 microetapas)
4. Fase 4 — Resumo e total por categoria ✅ concluída (3 microetapas)
5. Fase 5 — Aperfeiçoamentos e diferenciais 🚧 em andamento (importação CSV; depois: metas, visual refinado, Open Finance simulado)

## Fase atual
Fase 5 — Aperfeiçoamentos e diferenciais (Microetapa 1 concluída — importação de extrato CSV)

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
- Fase 3 — Categorias e organização
  - [x] Microetapa 1: Criar o seletor de categorias no formulário de despesa (HTML + CSS)
  - [x] Microetapa 2: Salvar a categoria em cada transação (no objeto) e no localStorage
  - [x] Microetapa 3: Mostrar a categoria no extrato
- Fase 4 — Resumo e total por categoria
  - [x] Microetapa 1: Marcar o tipo (receita/despesa) na transação e colorir o extrato (verde/vermelho)
  - [x] Microetapa 2: Seção Resumo com total de receitas e de despesas
  - [x] Microetapa 3: Gastos por categoria (somar os valores de cada categoria)
- Fase 5 — Aperfeiçoamentos e diferenciais
  - [x] Microetapa 1: Importação de extrato em CSV (ler arquivo, validar e lançar transações)
  - [ ] Microetapa 2: (a definir — metas de gasto por categoria / visual refinado / Open Finance simulado)

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
- Array, objeto, push, length, laço for; createElement/appendChild; JSON (stringify/parse).
- select/option (menu dropdown) para categorias.
- Array (lista), objeto {chave: valor}, push(), length, laço for.
- Criar elementos na tela: createElement + appendChild.
- JSON: stringify (texto) e parse (lista) — ponte com a gaveta.
- Validação de entrada: if, alert(), return.
- Git/GitHub: init, config, add, commit, branch main, remote, push.
- Campo `tipo` no objeto da transação (receita/despesa) para colorir valores.
- CSS: classes (.receita/.despesa) e cores verde (#22c55e) / vermelho (#ef4444).
- Operador ternário `condição ? a : b` (versão curta do if/else).
- Função auxiliar (formatarDinheiro) para evitar repetição de código (DRY).
- Objeto usado como "dicionário" (totais[categoria]) e laço `for...in`.
- Acumulador (somar valores em um laço) para montar o resumo e os totais por categoria.
- `<input type="file">` e `.files[0]` (escolher arquivo do computador).
- FileReader: readAsText (UTF-8), onload e .result (ler arquivo no navegador).
- Tratamento de texto: split, trim, continue, isNaN, toLowerCase.
- Refatoração (DRY): funções registrarTransacao e atualizarTela para não repetir código.

## Problemas pendentes
Nenhum.

## Histórico de bugs corrigidos
- Bug: saldo salvo não aparecia após F5. Causa: faltava a chamada inicial `exibirSaldo();` no `app.js`. Correção: adicionada a chamada no final do arquivo.
- Bug: transação sem valor era adicionada ao extrato. Causa: `Number("")` vira 0 e não havia checagem. Correção: validação `if (valor <= 0)` com `alert` e `return` nos dois formulários.

## Próxima microetapa
Fase 5 — Microetapa 2 (a definir: metas de gasto por categoria OU visual refinado OU Open Finance simulado).

## Observações
- Todo o conteúdo didático (explicações de cada microetapa, bugs corrigidos e GitHub) está salvo de forma permanente em **TUTORIAL.md** e regenerado em **TUTORIAL.pdf**.
- Para retomar: abrir o opencode na pasta `controle-financeiro` e dizer "Leia o PROGRESSO.md e o TUTORIAL.md e continue de onde paramos".
- Rotina Git: após cada etapa, `git add .` → `git commit -m "mensagem"` → `git push`.