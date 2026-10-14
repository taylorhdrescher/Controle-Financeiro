# EBOOK — Controle Financeiro do Zero
### Tutorial guiado, microetapa por microetapa

> Projeto didático: um site responsivo de controle financeiro pessoal (receitas, despesas e saldo), construído do zero, ensinando programação para iniciantes absolutos.

---

## Como funciona este tutorial
- Avançamos **uma microetapa por vez**, sempre com: objetivo → implementação → explicação → teste → resultado.
- Linguagem acessível: cada conceito novo é explicado primeiro em português simples.
- O projeto usa apenas HTML, CSS e JavaScript puro — sem instalar nada além de um editor (VSCode, opcional).

---

## Sumário
1. Fase 1 — Estrutura e interface básica
   - Microetapa 1: A estrutura de arquivos
   - Microetapa 2: A base do HTML
   - Microetapa 3: O primeiro CSS
   - Microetapa 4: O primeiro JavaScript
2. Fase 2 — Cadastro de transações
   - Microetapa 1: O formulário de receita
   - Microetapa 1b: O visual dark + laranja
   - Microetapa 2: O botão Adicionar funciona
   - Microetapa 3: O formulário de despesa
   - Microetapa 3b: Salvando com localStorage
   - Microetapa 4: O extrato (array e JSON)
   - Bugs corrigidos: saldo após F5 + transação sem valor
3. Fase 3 — Categorias e organização
   - Microetapa 1: O seletor de categorias
   - Microetapa 2: Salvar a categoria em cada transação
   - Microetapa 3: Mostrar a categoria no extrato
4. Fase 4 — Resumo e total por categoria
   - Microetapa 1: Tipo da transação e cores no extrato (verde/vermelho)
   - Microetapa 2: A seção Resumo (total de receitas e despesas)
   - Microetapa 3: Gastos por categoria
5. Fase 5 — Aperfeiçoamentos e diferenciais
   - Microetapa 1: Importação de extrato em CSV
6. GitHub: subindo o projeto para a nuvem
7. Conceitos aprendidos até aqui (glossário)
8. Próximos passos

---

# FASE 1 — ESTRUTURA E INTERFACE BÁSICA

## Microetapa 1 — A estrutura de arquivos

**Objetivo:** criar a "casa" do projeto: uma pasta com 4 arquivos.

**O que foi criado:**

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página (textos, campos, botões) |
| `style.css` | Visual (cores, espaçamento, responsividade) |
| `app.js` | Lógica (somar, guardar, mostrar dados) |
| `PROGRESSO.md` | Memória do projeto (este diário) |

**Conceito novo: extensão de arquivo.** É o final do nome (`html`, `css`, `js`, `md`). Diz ao computador o tipo do arquivo e qual programa sabe abrir. O `index.html` é sempre a porta de entrada de um site.

---

## Microetapa 2 — A base do HTML

**Objetivo:** montar o esqueleto: cabeçalho e área principal.

```html
<body>
  <header>
    <h1>Meu Controle Financeiro</h1>
  </header>
  <main>
    <p>Aqui vão ficar seus registros de receitas e despesas.</p>
  </main>
</body>
```

**Explicação:**
- `<header>` → o topo da página (cabeçalho). Tag semântica: diz a função daquela parte.
- `<h1>` → título grande.
- `<main>` → a área principal do conteúdo.
- `<p>` → parágrafo.

**Conceito novo: tags em pares.** `<header>` abre e `</header>` fecha. É como caixas: o que está dentro pertence à caixa. Caixas podem ficar dentro de outras (o `<h1>` dentro do `<header>`).

---

## Microetapa 3 — O primeiro CSS

**Objetivo:** dar cores e organização; funcionar em PC e celular.

Ligamos o CSS ao HTML com: `<link rel="stylesheet" href="style.css">`

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f9;
  color: #333;
}

header {
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  text-align: center;
}

@media (min-width: 768px) {
  main {
    max-width: 700px;
    margin: 0 auto;
  }
}
```

**Explicação:**
- `body` → regras gerais da página. `font-family` define a letra; `margin: 0` remove bordas automáticas; `#f4f4f9` é um **código de cor hexadecimal** (sempre começa com `#`).
- `padding` → espaço interno da caixa ("respiro").
- `text-align: center` → centraliza texto.

**Conceito novo: media query (responsividade).** `@media (min-width: 768px)` aplica as regras de dentro **somente** quando a tela tem pelo menos 768px (PC/tablet). No celular, a área principal ocupa a largura toda; no PC ela fica estreita e centralizada (`margin: 0 auto`).

---

## Microetapa 4 — O primeiro JavaScript

**Objetivo:** JS escreve o saldo na tela. Nasceu a divisão que vale para todo o projeto: **HTML define o lugar, CSS enfeita, JS comanda.**

```html
<p>R$ <span id="saldo"></span></p>
<script src="app.js"></script>
```

```js
var saldo = 0;

function exibirSaldo() {
  document.getElementById("saldo").textContent = "R$ " + saldo.toFixed(2).replace(".", ",");
}

exibirSaldo();
```

**Explicação:**
- `<span id="saldo">` → uma "caixinha" com um **endereço** (`id`). O JS usa o endereço para achar e preencher o lugar.
- `<script src="app.js"></script>` → carrega o JS (como o `<link>` carrega o CSS).
- `var saldo = 0;` → **variável**: uma caixa na memória que guarda um valor.
- `function exibirSaldo() { ... }` → **função**: um bloco de código que executa quando chamado.
- `document.getElementById("saldo")` → o JS "conversando" com o HTML: pega o elemento pelo id.
- `.textContent` → substitui o texto dentro do elemento.
- `saldo.toFixed(2)` → força 2 casas decimais. `.replace(".", ",")` → troca ponto por vírgula (formato brasileiro).
- `exibirSaldo();` → **chamada da função** — sem ela, a função só existe escrita, não roda.

---

# FASE 2 — CADASTRO DE TRANSAÇÕES

## Microetapa 1 — O formulário de receita

**Objetivo:** criar a tela para digitar descrição e valor de uma receita.

```html
<form id="form-receita">
  <label for="descricao">Descrição</label>
  <input type="text" id="descricao" placeholder="Ex: Salário">
  <label for="valor">Valor (R$)</label>
  <input type="number" id="valor" step="0.01" min="0">
  <button type="submit">Adicionar</button>
</form>
```

**Explicação:**
- `<form>` → formulário (área de preenchimento). Ganhou `id` para o JS achar.
- `<label for="descricao">` → etiqueta; o `for` liga ao campo de mesmo `id`.
- `input type="text"` → campo de texto; `placeholder` é a sugestão que some ao digitar.
- `input type="number"` → só aceita números; `step="0.01"` permite centavos; `min="0"` barra negativos.
- `button type="submit"` → botão que "envia" o formulário (o JS vai interceptar isso). `cursor: pointer` no CSS deixa o mouse como "mãozinha".

---

## Microetapa 1b — O visual dark + laranja

**Objetivo:** trocar a "roupa" da página: tema escuro com laranja, inspirado no Meu Planner Financeiro.

Paleta: fundo `#111827`, cartões `#1f2937`, destaque `#f97316`, texto `#f9fafb`.

**O que se aprendeu:**
- **Dark mode cria profundidade**: o que está "por cima" é mais claro que o fundo.
- **Seletor combinado** `header h1` → "o `<h1>` dentro do `<header>`".
- `section` com `border-radius` → cantos arredondados viram cartões.
- Contraste: campo escuro com texto claro (legibilidade).
- `#saldo` (o `#` = "elemento com o id saldo") com `font-size: 2em` e `font-weight: bold` → saldo com destaque.

---

## Microetapa 2 — O botão Adicionar funciona

**Objetivo:** o clique no botão pega o valor digitado, soma ao saldo e mostra na tela.

```js
document.getElementById("form-receita").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descricao = document.getElementById("descricao").value;
  var valor = Number(document.getElementById("valor").value);

  saldo = saldo + valor;
  exibirSaldo();
});
```

**Explicação:**
- `addEventListener("submit", ...)` → o JS **escuta** o evento de clique no botão do formulário.
- `evento.preventDefault()` → **impede o comportamento padrão**: recarregar a página. Sem isso, tudo se apagava.
- `.value` → lê o que o usuário digitou.
- `Number(...)` → converte o texto (**"250"**) em número (**250**). Sem isso, `"250" + 100` viraria `"250100"` (junção de textos, não soma).
- `var descricao` → guardada para ser usada na etapa da lista de transações (mais à frente).

**Conceito novo: evento.** Um sinal do navegador ("alguém clicou"). O JS escuta e reage.

---

## Microetapa 3 — O formulário de despesa

**Objetivo:** cadastrar despesas — mesma estrutura da receita, mas **subtrai** valor.

Campos com **ids diferentes** (`descricao-despesa`, `valor-despesa`) porque **ids devem ser únicos** na página — senão o JS não sabe qual campo é qual.

```js
document.getElementById("form-despesa").addEventListener("submit", function (evento) {
  evento.preventDefault();
  var valor = Number(document.getElementById("valor-despesa").value);
  saldo = saldo - valor;
  exibirSaldo();
});
```

**Lição sobre padrão:** copiamos uma estrutura parecida e ajustamos o essencial (o `id` e o sinal `-`). Esse é um padrão comum em programação. Mais adiante vamos reduzir a repetição.

---

## Microetapa 3b — Salvando com localStorage

**Objetivo:** os dados sobreviverem ao F5, sem servidor.

```js
var saldo = Number(localStorage.getItem("saldo")) || 0;

function exibirSaldo() {
  document.getElementById("saldo").textContent = "R$ " + saldo.toFixed(2).replace(".", ",");
  localStorage.setItem("saldo", saldo);
}
```

**Explicação:**
- `localStorage.getItem("saldo")` → lê da "gaveta" do navegador (devolve texto ou `null`).
- `Number(...)` → converte de volta para número (a gaveta só guarda texto).
- `|| 0` → "ou então 0": se não houver nada guardado, começa em 0.
- `localStorage.setItem("saldo", saldo)` → grava na gaveta. Foi colocada dentro de `exibirSaldo()`, que roda a cada mudança → **sempre que muda, salva** (um único lugar para salvar evita bugs).

**Conceito novo: persistência.** Guardar informações para além do momento em que o programa roda. É o que faz o app lembrar do usuário.

**Como ver a gaveta:** F12 → aba Application → Local Storage → nome do arquivo.

---

## Microetapa 4 — O extrato (array e JSON)

**Objetivo:** cada transação aparece na tela como item do "Extrato" (descrição + valor), e a lista inteira também é salva na gaveta.

HTML (nova seção):
```html
<section>
  <h2>Extrato</h2>
  <ul id="lista-transacoes"></ul>
</section>
```

CSS:
```css
ul { list-style: none; padding: 0; margin: 0; }
li { background-color: #111827; padding: 10px; border-radius: 6px; margin-bottom: 8px; }
```

JS (as novidades):
```js
var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function salvarTransacoes() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function exibirTransacoes() {
  var lista = document.getElementById("lista-transacoes");
  lista.textContent = "";

  for (var i = 0; i < transacoes.length; i++) {
    var item = document.createElement("li");
    var transacao = transacoes[i];
    item.textContent = transacao.descricao + " — R$ " + transacao.valor.toFixed(2).replace(".", ",");
    lista.appendChild(item);
  }
}
```

E nos dois formulários, ao adicionar: `transacoes.push({ descricao: descricao, valor: valor });` + `salvarTransacoes();` + `exibirTransacoes();`

**Conceitos novos:**
- **Array (lista):** `[ ]` guarda vários valores em fila. `var transacoes` é a lista de transações.
- **Objeto:** `{ chave: valor }` guarda várias informações sobre a mesma coisa (descrição + valor).
- **`push(...)`:** adiciona um item no final da lista.
- **Laço `for`:** repete enquanto a condição valer. `for (var i = 0; i < transacoes.length; i++)` percorre a lista do primeiro ao último; `transacoes[i]` é o item da vez. `length` = tamanho.
- **`document.createElement("li")`:** cria um item (ainda fora da tela).
- **`lista.appendChild(item)`:** anexa o item criado dentro da lista da página.
- **JSON:** a gaveta só guarda texto. `JSON.stringify(transacoes)` transforma a lista em texto (para salvar); `JSON.parse(...)` transforma de volta em lista (para ler). É a "ponte texto ↔ lista".
- **`lista.textContent = ""`:** limpa antes de redesenhar — sem isso, a lista dobraria a cada clique.

🎉 **Fim da Fase 2.** O app soma, subtrai, mostra o histórico e não perde nada.

---

## BUG CORRIGIDO — transação sem valor entrava no extrato

**Sintoma (você relatou):** clicar em "Adicionar" com o valor vazio criava a transação mesmo assim.

**Diagnóstico:** `Number("")` vira `0` (campo vazio = 0), e não havia nenhuma checagem antes de salvar. Os campos de formulário *sugerem*, mas não *bloqueiam* — a proteção de verdade é feita no código.

**Correção (validação de entrada)** — adicionada nos DOIS formulários, antes de qualquer coisa:
```js
if (valor <= 0) {
  alert("Digite um valor maior que zero.");
  return;
}
```

**Conceitos novos:**
- **`if (condição)`:** o "se" da programação — executa o bloco só se a condição for verdadeira.
- **`alert("...")`:** janelinha de aviso do navegador (retorno ao usuário).
- **`return;`:** sai da função na hora, ignorando o resto. Como a checagem vem antes do saldo/extrato, nada é somado nem listado. É o "ponto de interdição".

**Lição:** todo dado que entra no sistema precisa ser **validado** antes de ser usado. Isso se chama validação de entrada e é uma base de segurança em qualquer app.

---

# FASE 3 — CATEGORIAS E ORGANIZAÇÃO

## Microetapa 1 — O seletor de categorias

**Objetivo:** adicionar um menu de escolha (dropdown) com categorias no formulário de despesas, para futuramente organizar e resumir os gastos.

**Por que:** sem categoria, o extrato é só uma lista solta. Com ela, poderemos responder "quanto gastei em alimentação?" — o coração de um controle financeiro.

HTML adicionado ao formulário de despesa:
```html
<label for="categoria-despesa">Categoria</label>
<select id="categoria-despesa">
  <option>Moradia</option>
  <option>Alimentação</option>
  <option>Transporte</option>
  <option>Lazer</option>
  <option>Saúde</option>
  <option>Outros</option>
</select>
```

CSS (mesmas regras do input, para que os campos tenham a mesma aparência):
```css
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background-color: #111827;
  color: #f9fafb;
}
```

**Conceitos novos:**
- **`<select>`** = caixa de menu (dropdown). Igual aos outros campos: `<label>` explicando + `id` para o JS achar.
- **`<option>`** = cada escolha possível dentro do menu. O primeiro já vem selecionado por padrão.
- **Categorias iniciais:** Moradia, Alimentação, Transporte, Lazer, Saúde, Outros.

**Importante:** nesta microetapa a categoria aparece na tela, mas **ainda não é salva** — isso é a próxima etapa (o JS precisa ler o valor do `<select>` e guardá-lo).

---

## Microetapa 2 — Salvar a categoria em cada transação

**Objetivo:** o JS passar a ler o valor escolhido no menu e guardá-lo junto com a despesa.

```js
var categoria = document.getElementById("categoria-despesa").value;
transacoes.push({ descricao: descricao, valor: valor, categoria: categoria });
```

**Explicação:**
- `document.getElementById("categoria-despesa").value` → lemos o valor escolhido no `<select>`. Todo campo tem `.value`: no `<input>` é o texto digitado; no `<select>` é a `<option>` selecionada.
- `categoria: categoria` → adicionamos um **novo campo** ao objeto da transação. O objeto nasceu com `{ descricao, valor }` e agora tem também `categoria`.
- **Não foi preciso mudar como salvamos:** a lista inteira já é guardada com `salvarTransacoes()` (JSON). Como o objeto ganhou o campo novo, ele é salvo automaticamente.

---

## Microetapa 3 — Mostrar a categoria no extrato

**Objetivo:** o item do extrato mostrar a categoria, mas só quando ela existir (receitas não têm categoria).

```js
if (transacao.categoria) {
  item.textContent = transacao.descricao + " [" + transacao.categoria + "] — R$ " + transacao.valor.toFixed(2).replace(".", ",");
} else {
  item.textContent = transacao.descricao + " — R$ " + transacao.valor.toFixed(2).replace(".", ",");
}
```

**Explicação:**
- **`if` / `else`** → "se ... senão ...". Um caminho quando a condição é verdadeira, outro quando é falsa.
- `if (transacao.categoria)` → além de `true`/`false`, o `if` aceita qualquer valor "verdadeiro". Se o campo não existir, é `undefined` (falso) → cai no `else`.
- **Lição:** o mesmo tipo de dado pode ter **formatos diferentes** (despesa tem categoria, receita não). O código precisa se adaptar a isso.

🎉 **Fim da Fase 3.** As despesas agora estão organizadas por categoria.

---

# FASE 4 — RESUMO E TOTAL POR CATEGORIA

## Microetapa 1 — Tipo da transação e cores no extrato (verde/vermelho)

**Objetivo:** pintar de **verde** o que entra (receita) e de **vermelho** o que sai (despesa). Para isso, cada transação precisa "saber" o que ela é.

Antes, o extrato só somava/subtraía o saldo, mas o item não guardava **se era** receita ou despesa. Adicionamos um campo `tipo` no objeto:

```js
transacoes.push({ descricao: descricao, valor: valor, tipo: "receita" });
transacoes.push({ descricao: descricao, valor: valor, categoria: categoria, tipo: "despesa" });
```

Agora o JS consegue identificar cada uma. Criamos uma **função auxiliar** (evita repetir a mesma pergunta em vários lugares):

```js
function ehDespesa(transacao) {
  return transacao.tipo === "despesa" || (!transacao.tipo && transacao.categoria);
}
```

No extrato, usamos o tipo para escolher a cor e o sinal:

```js
var despesa = ehDespesa(transacao);
var sinal = despesa ? "- " : "+ ";
item.textContent = transacao.descricao + " — " + sinal + formatarDinheiro(transacao.valor);
item.className = despesa ? "despesa" : "receita";
```

CSS das cores:

```css
.receita {
  color: #22c55e;
  font-weight: bold;
}

.despesa {
  color: #ef4444;
  font-weight: bold;
}
```

**Conceitos novos:**
- **Campo `tipo`:** guarda a "natureza" da transação. É o dado que faltava para colorir e resumir.
- **`===`:** comparação de valor e tipo (diferente de `=` que *atribui*). "É exatamente igual a".
- **Operador ternário `condição ? a : b`:** versão curta do `if/else` — "se for verdade, use `a`; senão, `b`".
- **`item.className`:** troca a classe CSS do elemento criado, ligando-o às regras `.receita` / `.despesa`.
- **Função auxiliar:** uma pequena função reaproveitada em vários pontos — deixa o código mais limpo (princípio DRY, "Don't Repeat Yourself").
- **Retrocompatibilidade:** `ehDespesa` também reconhece despesas antigas (salvas antes do campo `tipo`), usando a presença de `categoria` como pista.

---

## Microetapa 2 — A seção Resumo (total de receitas e despesas)

**Objetivo:** mostrar, separadamente, quanto entrou e quanto saiu — e não só o saldo final.

HTML (nova seção, logo abaixo do saldo):

```html
<section>
  <h2>Resumo</h2>
  <p>Receitas: <span id="total-receitas" class="receita"></span></p>
  <p>Despesas: <span id="total-despesas" class="despesa"></span></p>
</section>
```

JS — percorremos a lista somando em **acumuladores**:

```js
function exibirResumo() {
  var totalReceitas = 0;
  var totalDespesas = 0;

  for (var i = 0; i < transacoes.length; i++) {
    if (ehDespesa(transacoes[i])) {
      totalDespesas = totalDespesas + transacoes[i].valor;
    } else {
      totalReceitas = totalReceitas + transacoes[i].valor;
    }
  }

  document.getElementById("total-receitas").textContent = formatarDinheiro(totalReceitas);
  document.getElementById("total-despesas").textContent = formatarDinheiro(totalDespesas);
}
```

**Conceitos novos:**
- **Acumulador:** uma variável que começa em `0` e vai recebendo soma a cada volta do laço (`total = total + valor`). É assim que se calcula total em qualquer sistema.
- **Verde e vermelho com significado:** a cor comunica rápido (entrada x saída). É a mesma ideia das planilhas financeiras.

---

## Microetapa 3 — Gastos por categoria

**Objetivo:** responder "quanto gastei em cada categoria?" — somando os valores por categoria.

HTML (nova seção):

```html
<section>
  <h2>Gastos por categoria</h2>
  <ul id="lista-categorias"></ul>
</section>
```

JS — usamos um **objeto como dicionário**: a categoria é a *chave* e o total é o *valor*:

```js
function exibirCategorias() {
  var lista = document.getElementById("lista-categorias");
  lista.textContent = "";

  var totais = {};

  for (var i = 0; i < transacoes.length; i++) {
    var transacao = transacoes[i];

    if (ehDespesa(transacao)) {
      var categoria = transacao.categoria;

      if (totais[categoria]) {
        totais[categoria] = totais[categoria] + transacao.valor;
      } else {
        totais[categoria] = transacao.valor;
      }
    }
  }

  for (var categoria in totais) {
    var item = document.createElement("li");
    item.textContent = categoria + " — " + formatarDinheiro(totais[categoria]);
    lista.appendChild(item);
  }
}
```

**Conceitos novos:**
- **Objeto como dicionário:** `totais[categoria]` usa o *valor da variável* como chave. Se `categoria` vale `"Lazer"`, é o mesmo que `totais["Lazer"]`.
- **Criar a chave na primeira vez:** se `totais[categoria]` ainda não existe, guardamos o primeiro valor; nas próximas, somamos. É o padrão "inicializa e acumula".
- **Laço `for...in`:** percorre as **chaves** de um objeto (aqui, cada categoria), diferente do `for` clássico que percorre posições de uma lista.
- **`formatarDinheiro`:** função criada para não repetir `"R$ " + valor.toFixed(2).replace(".", ",")` em todo lugar.

🎉 **Fim da Fase 4.** O app mostra saldo, resumo com cores e os gastos por categoria.

---

# FASE 5 — APERFEIÇOAMENTOS E DIFERENCIAIS

## Microetapa 1 — Importação de extrato em CSV

**Objetivo:** em vez de digitar transação por transação, o usuário escolhe um arquivo `.csv` (planilha em texto) e o app lança todas de uma vez. É o "diferencial" do projeto.

**Por que CSV:** é um formato simples e universal (abre no Excel, Google Planilhas e bloco de notas). Serve como uma alternativa didática ao Open Finance (que exigiria banco e certificados).

**Formato adotado** (uma transação por linha):

```
descricao,valor,tipo,categoria
Salario,3000,receita,
Mercado,450.75,despesa,Alimentação
Aluguel,1200,despesa,Moradia
```

- Colunas separadas por **vírgula**; decimal com **ponto** (padrão do CSV).
- `tipo` deve ser `receita` ou `despesa`; `categoria` só para despesas (pode ficar vazia).
- A primeira linha é o **cabeçalho** (nomes das colunas) — o app a ignora sozinho.

HTML (nova seção):

```html
<section>
  <h2>Importar extrato (CSV)</h2>
  <p class="dica">Formato: descricao,valor,tipo,categoria (uma transação por linha).</p>
  <input type="file" id="arquivo-csv" accept=".csv">
</section>
```

Primeiro, uma **refatoração** (reduzir repetição): as duas telas já faziam a mesma coisa — atualizar saldo, guardar e redesenhar. Extraímos isso para funções reutilizáveis:

```js
function registrarTransacao(descricao, valor, tipo, categoria) {
  if (tipo === "despesa") {
    saldo = saldo - valor;
  } else {
    saldo = saldo + valor;
  }

  var transacao = { descricao: descricao, valor: valor, tipo: tipo };

  if (categoria) {
    transacao.categoria = categoria;
  }

  transacoes.push(transacao);
}

function atualizarTela() {
  exibirSaldo();
  salvarTransacoes();
  exibirTransacoes();
  exibirResumo();
  exibirCategorias();
}
```

Assim, os formulários e a importação usam **a mesma lógica** (fonte única, menos bugs). A leitura do arquivo:

```js
document.getElementById("arquivo-csv").addEventListener("change", function (evento) {
  var arquivo = evento.target.files[0];

  if (!arquivo) {
    return;
  }

  var leitor = new FileReader();

  leitor.onload = function () {
    importarCSV(leitor.result);
  };

  leitor.readAsText(arquivo, "UTF-8");
});
```

E a função que interpreta o texto do CSV:

```js
function importarCSV(texto) {
  var linhas = texto.split(/\r?\n/);
  var importadas = 0;

  for (var i = 0; i < linhas.length; i++) {
    var linha = linhas[i].trim();

    if (linha === "") {
      continue;
    }

    var partes = linha.split(",");
    var descricao = partes[0].trim();
    var valor = Number(partes[1]);
    var tipo = (partes[2] || "").trim().toLowerCase();
    var categoria = (partes[3] || "").trim();

    if (descricao === "" || isNaN(valor) || valor <= 0) {
      continue;
    }

    if (tipo !== "receita" && tipo !== "despesa") {
      continue;
    }

    registrarTransacao(descricao, valor, tipo, categoria);
    importadas = importadas + 1;
  }

  atualizarTela();
  alert(importadas + " transação(ões) importada(s).");
}
```

**Conceitos novos:**
- **`<input type="file">`** → abre a janela do computador para escolher um arquivo. `accept=".csv"` filtra por tipo. O arquivo escolhido fica em `evento.target.files[0]`.
- **`FileReader`** → objeto do navegador que **lê arquivos**. `readAsText(arquivo, "UTF-8")` lê como texto; quando termina (`onload`), o conteúdo está em `leitor.result`. É assíncrono: os dados só chegam depois, dentro do `onload`.
- **`split(/\r?\n/)`** → quebra o texto em linhas. O `/\r?\n/` é uma **expressão regular** que aceita tanto `\n` (Linux) quanto `\r\n` (Windows).
- **`.trim()`** → remove espaços em branco e o "enter" do começo/fim de um texto (evita linhas e células "sujas").
- **`isNaN(valor)`** → "is Not a Number" (não é número). `Number("abc")` vira `NaN`; usamos isso para **descartar linhas inválidas** (inclusive o cabeçalho, pois a coluna valor tem a palavra "valor").
- **`continue;`** → pula para a próxima volta do laço **na hora**, sem executar o resto do bloco. Diferente do `return` (que sai da função toda), aqui pulamos só a linha inválida e continuamos importando.
- **`(partes[2] || "")`** → se a célula não existir (linha curta), usamos texto vazio para evitar erro.
- **`.toLowerCase()`** → deixa o texto minúsculo, para aceitar `Receita`, `RECEITA` ou `receita`.
- **Refatoração / DRY:** `registrarTransacao` e `atualizarTela` centralizam a lógica. Digitar e importar passam pelo mesmo caminho.

**Teste:** há um arquivo `exemplo-extrato.csv` na pasta do projeto — escolha-o na tela de importação e veja o saldo, o resumo e as categorias atualizarem de uma vez.

**Lição:** todo dado que vem de fora (arquivo, digitado, da internet) é "suspeito" e precisa ser **validado**. Linhas erradas são simplesmente ignoradas, sem quebrar o app.

---

## GITHUB — subindo o projeto para a nuvem

**O que é:** **Git** = a "máquina do tempo" do projeto (registra versões dos arquivos, dá para voltar no tempo). **GitHub** = serviço grátis que guarda o repositório na nuvem (backup + compartilhamento com o professor).

**O que fizemos:**
1. `git init` → transformou a pasta em repositório (criou a pasta escondida `.git`).
2. `git config user.name` e `git config user.email` → identidade para assinar os commits.
3. `git add .` → "empacotou" os arquivos (staging).
4. `git commit -m "..."` → tirou a "fotografia" (versão salva).
5. `git branch -m main` → branch no padrão do GitHub.
6. `git remote add origin <url>` → conectou com o repositório no GitHub.
7. `git push -u origin main` → **enviou tudo para a nuvem.**

**Guardar uma etapa nova:** `git add .` → `git commit -m "mensagem"` → `git push`.

**Conceitos novos:** **commit** = versão registrada do projeto (com mensagem explicando o que mudou); **branch** = uma "linha" de desenvolvimento (usamos a `main`); **remote** = o endereço da cópia na nuvem; **push** = enviar para o GitHub; **repositório** = pasta do projeto + máquina do tempo embutida.

**Link do projeto:** https://github.com/taylorhdrescher/Controle-Financeiro — no botão "commits" dá para ver a linha do tempo do projeto.

---

## BUG CORRIGIDO — saldo não aparecia após F5

**Sintoma (você relatou):** após atualizar, o saldo sumia da tela; ao fazer uma transação nova, somava com o valor antigo.

**Diagnóstico (o processo de depuração):**
- A gaveta (localStorage) sempre funcionou (getItem e setItem OK).
- O que faltava era **pintar o número na tela ao abrir a página**: na reescrita anterior, a chamada inicial `exibirSaldo();` no final do `app.js` foi perdida.

**Correção:** adicionada a chamada `exibirSaldo();` no final do arquivo. Hoje o `app.js` termina assim:

```js
exibirSaldo();
```

**Lição:** código pode estar funcionando (guardando certo) mas não fazer o que esperamos (mostrar). Por isso testamos sempre — é assim que se depura em projetos reais.

---

# GLOSSÁRIO — Conceitos aprendidos

| Conceito | O que é | Onde usamos |
|---|---|---|
| Extensão de arquivo | Final do nome que identifica o tipo | `.html`, `.css`, `.js` |
| Tag em par | Elemento HTML que abre e fecha | `<h1>…</h1>` |
| Aninhamento | Caixas dentro de caixas | `<h1>` dentro de `<header>` |
| Variável | Caixa na memória que guarda valor | `var saldo` |
| Função | Bloco que executa quando chamado | `function exibirSaldo()` |
| Id | Endereço único de um elemento | `id="saldo"` |
| Evento | Sinal do navegador (clique etc.) | `addEventListener("submit")` |
| preventDefault | Impede o comportamento padrão | parar o recarregar do form |
| .value | Lê o que foi digitado no campo | `getElementById("valor").value` |
| Number() | Converte texto em número | `Number("250")` → `250` |
| toFixed(2) | Força 2 casas decimais | R$ 0,00 |
| Media query | Regra CSS condicionada ao tamanho da tela | responsividade |
| localStorage | Gaveta de memória do navegador | salvar entre F5 |
| Persistência | Guardar dados além do programa rodando | saldo não some |
| Array | Lista que guarda vários valores | `var transacoes = [...]` |
| Objeto | Agrupa informações sobre a mesma coisa | `{ descricao, valor }` |
| push() | Adiciona item ao final da lista | `transacoes.push(...)` |
| length | Tamanho de uma lista | `transacoes.length` |
| Laço for | Repete um bloco várias vezes | percorrer a lista |
| createElement | Cria um elemento no JS | criar `<li>` |
| appendChild | Anexa o elemento criado na página | colocar `<li>` na lista |
| JSON | Formato texto que representa dados | salvar a lista na gaveta |
| Validação | Checar o dado antes de usar | `if (valor <= 0)` |
| if | O "se" da programação | condição |
| alert() | Janelinha de aviso do navegador | "Digite um valor maior..." |
| return | Sai da função na hora | interromper envio inválido |
| Git / commit | Máquina do tempo / versão registrada | backup do projeto |
| GitHub / push | Nuvem / enviar para a nuvem | repositório online |
| select / option | Menu de escolha (dropdown) | categoria da despesa |
| Campo `tipo` | Natureza da transação (receita/despesa) | colorir e resumir |
| `===` | Compara valor e tipo ("é exatamente igual") | `tipo === "despesa"` |
| Operador ternário | Versão curta do if/else | `despesa ? "- " : "+ "` |
| className | Define a classe CSS de um elemento via JS | `.receita` / `.despesa` |
| Acumulador | Variável que soma a cada volta do laço | total de receitas |
| for...in | Percorre as chaves de um objeto | cada categoria |
| Objeto como dicionário | Usa o valor da variável como chave | `totais[categoria]` |
| Função auxiliar (DRY) | Reaproveita lógica, evita repetição | `formatarDinheiro` / `ehDespesa` |
| if / else | "se ... senão ..." | item com ou sem categoria |
| input file | Escolher arquivo do computador | importar CSV |
| FileReader | Lê arquivos no navegador (assíncrono) | `readAsText` + `onload` |
| split() | Quebra um texto em partes | quebrar CSV em linhas/células |
| trim() | Remove espaços das pontas | limpar células da planilha |
| isNaN() | Diz se o valor "não é número" | descartar linha inválida |
| continue | Pula para a próxima volta do laço | ignorar linha errada |
| Expressão regular | Padrão de busca em texto | `/\r?\n/` (quebras de linha) |
| Refatoração | Reorganizar sem mudar o resultado | `registrarTransacao` / `atualizarTela` |

---

# PRÓXIMOS PASSOS
- Fase 3 — Categorias e organização ✅ concluída.
  - [x] Microetapa 1: seletor de categorias no formulário.
  - [x] Microetapa 2: salvar a categoria em cada transação.
  - [x] Microetapa 3: mostrar a categoria no extrato.
- Fase 4 — Resumo e total por categoria ✅ concluída.
  - [x] Microetapa 1: tipo da transação e cores no extrato.
  - [x] Microetapa 2: seção Resumo (receitas e despesas).
  - [x] Microetapa 3: gastos por categoria.
- Fase 5 — Aperfeiçoamentos e diferenciais 🚧 em andamento.
  - [x] Microetapa 1: importação de extrato em CSV.
  - [ ] Próximas: metas de gasto por categoria, visual refinado, Open Finance simulado.