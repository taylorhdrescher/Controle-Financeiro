exigirLogin();

var usuario = usuarioAtual();
var prefixo = "cf_" + (usuario ? usuario.email : "anon") + "_";

var saldo = Number(localStorage.getItem(prefixo + "saldo")) || 0;
var transacoes = JSON.parse(localStorage.getItem(prefixo + "transacoes")) || [];

function formatarDinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function ehDespesa(transacao) {
  return transacao.tipo === "despesa" || (!transacao.tipo && transacao.categoria);
}

function exibirSaldo() {
  document.getElementById("saldo").textContent = formatarDinheiro(saldo);
  localStorage.setItem(prefixo + "saldo", saldo);
}

function salvarTransacoes() {
  localStorage.setItem(prefixo + "transacoes", JSON.stringify(transacoes));
}

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

function exibirTransacoes() {
  var lista = document.getElementById("lista-transacoes");
  lista.textContent = "";

  for (var i = 0; i < transacoes.length; i++) {
    var transacao = transacoes[i];
    var despesa = ehDespesa(transacao);

    var item = document.createElement("li");

    var info = document.createElement("div");
    info.className = "transacao-info";

    var titulo = document.createElement("div");
    titulo.className = "transacao-titulo";
    titulo.textContent = transacao.descricao;

    var meta = document.createElement("div");
    meta.className = "transacao-meta";
    meta.textContent = (despesa ? "Despesa" : "Receita");

    if (transacao.categoria) {
      meta.textContent = meta.textContent + " • " + transacao.categoria;
    }

    info.appendChild(titulo);
    info.appendChild(meta);

    var valor = document.createElement("div");
    valor.className = "transacao-valor " + (despesa ? "despesa" : "receita");
    valor.textContent = (despesa ? "- " : "+ ") + formatarDinheiro(transacao.valor);

    item.appendChild(info);
    item.appendChild(valor);
    lista.appendChild(item);
  }
}

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

  var statusCsv = document.getElementById("csv-status");
  if (statusCsv) {
    statusCsv.textContent = importadas + " transação(ões) importada(s).";
  }

  var inputCsv = document.getElementById("arquivo-csv");
  if (inputCsv) {
    inputCsv.value = "";
  }
}

document.getElementById("form-receita").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descricao = document.getElementById("descricao").value;
  var valor = Number(document.getElementById("valor").value);

  if (valor <= 0) {
    alert("Digite um valor maior que zero.");
    return;
  }

  registrarTransacao(descricao, valor, "receita");
  atualizarTela();
});

document.getElementById("form-despesa").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descricao = document.getElementById("descricao-despesa").value;
  var valor = Number(document.getElementById("valor-despesa").value);
  var categoria = document.getElementById("categoria-despesa").value;

  if (valor <= 0) {
    alert("Digite um valor maior que zero.");
    return;
  }

  registrarTransacao(descricao, valor, "despesa", categoria);
  atualizarTela();
});

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

var contasOpenFinance = {
  "Banco Aurora": [
    { descricao: "Pix recebido", valor: 250, tipo: "receita" },
    { descricao: "Supermercado", valor: 320.5, tipo: "despesa", categoria: "Alimentação" },
    { descricao: "Posto de gasolina", valor: 180, tipo: "despesa", categoria: "Transporte" }
  ],
  "Banco Laranja": [
    { descricao: "Salário", valor: 2800, tipo: "receita" },
    { descricao: "Conta de luz", valor: 145.9, tipo: "despesa", categoria: "Moradia" },
    { descricao: "Farmácia", valor: 62.4, tipo: "despesa", categoria: "Saúde" },
    { descricao: "Streaming", valor: 39.9, tipo: "despesa", categoria: "Lazer" }
  ],
  "Fintech Pingo": [
    { descricao: "Transferência recebida", valor: 500, tipo: "receita" },
    { descricao: "Restaurante", valor: 88.6, tipo: "despesa", categoria: "Alimentação" },
    { descricao: "Aplicativo de transporte", valor: 27.5, tipo: "despesa", categoria: "Transporte" }
  ]
};

document.getElementById("btn-openfinance").addEventListener("click", function () {
  var banco = document.getElementById("banco-openfinance").value;
  var consentimento = document.getElementById("consentimento-openfinance").checked;
  var status = document.getElementById("status-openfinance");
  var botao = document.getElementById("btn-openfinance");

  if (!consentimento) {
    alert("Marque a autorização para compartilhar os dados (simulado).");
    return;
  }

  botao.disabled = true;
  status.textContent = "Conectando ao " + banco + "...";

  setTimeout(function () {
    var movimentacoes = contasOpenFinance[banco];

    for (var i = 0; i < movimentacoes.length; i++) {
      var movimentacao = movimentacoes[i];
      registrarTransacao(movimentacao.descricao, movimentacao.valor, movimentacao.tipo, movimentacao.categoria);
    }

    atualizarTela();
    status.textContent = movimentacoes.length + " transação(ões) sincronizada(s) do " + banco + ".";
    botao.disabled = false;
  }, 1500);
});

var inputArquivoCsv = document.getElementById("arquivo-csv");
if (inputArquivoCsv) {
  inputArquivoCsv.addEventListener("change", function () {
    var arquivo = this.files[0];
    var statusCsv = document.getElementById("csv-status");
    if (statusCsv) {
      if (arquivo) {
        statusCsv.textContent = "Arquivo: " + arquivo.name;
      } else {
        statusCsv.textContent = "";
      }
    }
  });
}

document.getElementById("usuario-atual").textContent = "Olá, " + (usuario ? usuario.nome : "") + "!";
document.getElementById("btn-sair").addEventListener("click", sair);

atualizarTela();
