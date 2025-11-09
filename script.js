
function cadastrar(event) {
  event.preventDefault();
  const nome = document.getElementById("cad-nome").value.trim();
  const email = document.getElementById("cad-email").value.trim();
  const senha = document.getElementById("cad-senha").value.trim();

  if (nome.length < 3 || !email.includes("@") || senha.length < 6) {
    alert("Preencha corretamente todos os campos.");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ nome, email, senha }));
  localStorage.setItem("logado", "true");
  alert(`Bem-vindo(a) ${nome}!`);
  window.location.href = "index.html";
}

function verificarLogin() {
  const logado = localStorage.getItem("logado");
  const area = document.getElementById("area-logado");
  if (logado === "true") {
    const user = JSON.parse(localStorage.getItem("user"));
    area.innerHTML = `Olá, ${user.nome}! <button onclick="logout()">Sair</button>`;
    const linkCarrinho = document.getElementById("link-carrinho");
    if (linkCarrinho) linkCarrinho.style.display = "inline-block";
  } else {
    area.innerHTML = `<a href="cadastro.html">Login / Cadastro</a>`;
    const linkCarrinho = document.getElementById("link-carrinho");
    if (linkCarrinho) linkCarrinho.style.display = "none";
  }
}

function logout() {
  localStorage.setItem("logado", "false");
  alert("Você saiu da conta.");
  window.location.reload();
}


function validarContato(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (nome.length < 3 || !email.includes("@") || assunto === "" || mensagem === "") {
    alert("Preencha corretamente todos os campos.");
    return;
  }

  alert("Mensagem enviada com sucesso! (Simulação)");
  document.getElementById("form-contato").reset();
}


function adicionarAoCarrinho(produto) {
  if (localStorage.getItem("logado") !== "true") {
    alert("Você precisa estar logado para adicionar ao carrinho.");
    window.location.href = "cadastro.html";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${produto} foi adicionado ao seu carrinho!`);
}

function carregarCarrinho() {
  if (localStorage.getItem("logado") !== "true") {
    document.getElementById("carrinho-itens").innerHTML = "<p>Faça login para visualizar seu carrinho.</p>";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    document.getElementById("carrinho-itens").innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let html = "<ul>";
  carrinho.forEach((item, index) => {
    html += `
      <li>
        ${item}
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </li>`;
  });
  html += "</ul>";
  html += `<button class="finalizar-compra">Finalizar Compra</button>`;

  document.getElementById("carrinho-itens").innerHTML = html;
}

function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

