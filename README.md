# Meu Controle Financeiro

Site responsivo de controle financeiro pessoal: registre receitas e despesas, acompanhe o saldo e o extrato — tudo salvo no próprio navegador.

Projeto de faculdade desenvolvido do zero, em microetapas guiadas, como parte do aprendizado de programação.

## Funcionalidades

- [x] Saldo atual (receitas somam, despesas subtraem)
- [x] Cadastro de receitas e despesas (descrição + valor)
- [x] Extrato com o histórico das transações
- [x] Dados salvos no navegador (localStorage) — não se perdem ao atualizar
- [x] Validação: impede transações sem valor
- [ ] Categorias (moradia, alimentação, lazer...)
- [ ] Resumo do mês com cores (verde/vermelho)
- [ ] Diferenciais: importação de extrato (CSV) ou Open Finance simulado

## Tecnologias

- **HTML** — estrutura da página
- **CSS** — visual responsivo (tema dark + laranja)
- **JavaScript** — lógica e interação
- **localStorage** — persistência dos dados no navegador

Sem frameworks, sem servidor: simples e ideal para aprender.

## Como usar

1. Baixe ou clone este repositório.
2. Abra a pasta e dê dois cliques em `index.html`.
3. Pronto — adicione suas receitas e despesas. Os dados ficam salvos no navegador.

Dica: abra com o **Live Server** no VS Code para recarregar automaticamente a cada salvamento.

## Estrutura do projeto

```
controle-financeiro/
├── index.html      → estrutura da página
├── style.css       → visual (dark + laranja, responsivo)
├── app.js          → lógica (saldo, formulários, localStorage)
├── PROGRESSO.md    → memória do desenvolvimento
├── TUTORIAL.md     → ebook do aprendizado, microetapa por microetapa
├── TUTORIAL.pdf    → versão em PDF do tutorial
└── ebook.html      → versão formatada do tutorial (imprimível)
```

## Aprendizado

Este projeto foi construído com o método de **microetapas**: pequenas etapas testáveis, uma por vez, com explicação didática de cada conceito. Todo o material está em `TUTORIAL.md` e `TUTORIAL.pdf` (do arquivo em branco ao localStorage).

## Autor

Desenvolvido por Taylor Drescher como projeto de faculdade.