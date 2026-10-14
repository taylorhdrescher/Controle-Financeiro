document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nome = document.getElementById("nome").value.trim();
  var email = document.getElementById("email").value.trim().toLowerCase();
  var senha = document.getElementById("senha").value;

  if (nome === "" || email === "") {
    alert("Preencha o nome e o email.");
    return;
  }

  if (senha.length < 4) {
    alert("A senha precisa ter pelo menos 4 caracteres.");
    return;
  }

  if (existeEmail(email)) {
    alert("Este email já está cadastrado.");
    return;
  }

  var usuarios = carregarUsuarios();
  usuarios.push({ nome: nome, email: email, senha: hashSenha(senha) });
  salvarUsuarios(usuarios);

  alert("Conta criada com sucesso! Agora faça login.");
  window.location.href = "login.html";
});
