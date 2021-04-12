import labelFloat from "../../../public/js/labelFloat.js";
import ShopItem from '../../../public/js/shopItem.js';

const parent = document.getElementById("parent");
const preview = new ShopItem(parent, {
  title: null,
  price: null,
  purchaseLink: null,
  demoImg: null,
  id: null
}, true);
const inputs = [...labelFloat()];
inputs.forEach((e, i) => {
  const index = i;
  e.oninput = (e) => {
    switch (index) {
      case 0:
        preview.title = e.target.value;
        break;
      case 1:
        preview.price = e.target.value;
        break;
      case 2:
        preview.demoImg = e.target.value;
        break;
      case 3:
        preview.purchaseLink = e.target.value;
        break;
    }
    preview.Build();
  }
});

const submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/php-simplest-api-possible/api/product", 
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nm_produto: preview.title,
        vl_produto: preview._price,
        ds_compra: preview.purchaseLink,
        im_produto: preview.demoImg
      })
    }
  );//400, 401, 403
  const err = document.getElementById("err");
  switch (response.status) {
    case 200:
      inputs.forEach(e => e.value = "");
      err.textContent = "";
      break;
    case 400:
      err.textContent = "Dados inválidos";
      break;
    case 401:
      err.textContent = "Não autorizado";
      break;
    case 403:
      err.textContent = "Sem credenciais";
      break;
    default:
      err.textContent = "Erro desconhecido";
      break;
  }
});

async function checkLogin () {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/php-simplest-api-possible/api/user", 
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    }
  );

  if (!response.ok) {
    window.location = "/projeto-teste-pwiii-ds/php-simplest-api-possible/login"
  } else {
    const email = document.getElementById("email");
    email.innerHTML = (await response.json()).cd_email_usuario;
  }
}
checkLogin();