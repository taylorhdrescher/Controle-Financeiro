document.getElementById("form-login").addEventListener("submit", function (evento) {
  evento.preventDefault();

  var email = document.getElementById("email").value.trim().toLowerCase();
  var senha = document.getElementById("senha").value;

  if (email === "" || senha === "") {
    alert("Preencha o email e a senha.");
    return;
  }

  var usuarios = carregarUsuarios();
  var encontrado = null;

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      encontrado = usuarios[i];
    }
  }

  if (!encontrado || encontrado.senha !== hashSenha(senha)) {
    alert("Email ou senha inválidos.");
    return;
  }

  definirSessao(email);
  window.location.href = "app.html";
});
