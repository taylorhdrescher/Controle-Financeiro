var saldo = Number(localStorage.getItem("saldo")) || 0;
var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function formatarDinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function ehDespesa(transacao) {
  return transacao.tipo === "despesa" || (!transacao.tipo && transacao.categoria);
}

function exibirSaldo() {
  document.getElementById("saldo").textContent = formatarDinheiro(saldo);
  localStorage.setItem("saldo", saldo);
}

function salvarTransacoes() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
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
    var item = document.createElement("li");
    var despesa = ehDespesa(transacao);
    var sinal = despesa ? "- " : "+ ";
    var texto = transacao.descricao + " — " + sinal + formatarDinheiro(transacao.valor);

    if (transacao.categoria) {
      texto = texto + " [" + transacao.categoria + "]";
    }

    item.textContent = texto;
    item.className = despesa ? "despesa" : "receita";
    lista.appendChild(item);
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

  saldo = saldo + valor;
  transacoes.push({ descricao: descricao, valor: valor, tipo: "receita" });

  exibirSaldo();
  salvarTransacoes();
  exibirTransacoes();
  exibirResumo();
  exibirCategorias();
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

  saldo = saldo - valor;
  transacoes.push({ descricao: descricao, valor: valor, categoria: categoria, tipo: "despesa" });

  exibirSaldo();
  salvarTransacoes();
  exibirTransacoes();
  exibirResumo();
  exibirCategorias();
});

exibirSaldo();
exibirTransacoes();
exibirResumo();
exibirCategorias();
