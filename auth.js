var CHAVE_USUARIOS = "cf_usuarios";
var CHAVE_SESSAO = "cf_sessao";

function carregarUsuarios() {
  return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

function hashSenha(senha) {
  var hash = 0;

  for (var i = 0; i < senha.length; i++) {
    hash = (hash * 31 + senha.charCodeAt(i)) | 0;
  }

  return "h" + Math.abs(hash);
}

function existeEmail(email) {
  var usuarios = carregarUsuarios();

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return true;
    }
  }

  return false;
}

function sessaoEmail() {
  return localStorage.getItem(CHAVE_SESSAO);
}

function usuarioAtual() {
  var email = sessaoEmail();
  var usuarios = carregarUsuarios();

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return usuarios[i];
    }
  }

  return null;
}

function definirSessao(email) {
  localStorage.setItem(CHAVE_SESSAO, email);
}

function sair() {
  localStorage.removeItem(CHAVE_SESSAO);
  window.location.href = "index.html";
}

function exigirLogin() {
  if (!sessaoEmail()) {
    window.location.href = "login.html";
  }
}
