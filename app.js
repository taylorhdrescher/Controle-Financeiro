var saldo = Number(localStorage.getItem("saldo")) || 0;
var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function exibirSaldo() {
  document.getElementById("saldo").textContent = "R$ " + saldo.toFixed(2).replace(".", ",");
  localStorage.setItem("saldo", saldo);
}

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

document.getElementById("form-receita").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descricao = document.getElementById("descricao").value;
  var valor = Number(document.getElementById("valor").value);

  if (valor <= 0) {
    alert("Digite um valor maior que zero.");
    return;
  }

  saldo = saldo + valor;
  transacoes.push({ descricao: descricao, valor: valor });

  exibirSaldo();
  salvarTransacoes();
  exibirTransacoes();
});

document.getElementById("form-despesa").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descricao = document.getElementById("descricao-despesa").value;
  var valor = Number(document.getElementById("valor-despesa").value);

  if (valor <= 0) {
    alert("Digite um valor maior que zero.");
    return;
  }

  saldo = saldo - valor;
  transacoes.push({ descricao: descricao, valor: valor });

  exibirSaldo();
  salvarTransacoes();
  exibirTransacoes();
});

exibirSaldo();
exibirTransacoes();