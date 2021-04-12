import labelFloat from "../../../public/js/labelFloat.js";

const inputs = [...labelFloat()];

const signIn = document.getElementById("signIn");
signIn.addEventListener("click", async function () {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/php-simplest-api-possible/api/user", 
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email: inputs[0].value,
        password: inputs[1].value
      })
    }
  );

  if (response.status !== 200) {
    const err = document.getElementById("err");
    err.textContent = "Dados Inválidos";
  } else {
    window.location = "/projeto-teste-pwiii-ds/php-simplest-api-possible/gerenciar-itens";
  }
});

async function fetchProducts () {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/02-trabalho-pra-mencao/api/product", 
    {
      method: "GET",
      credentials: "include"
    }
  );

  const items = await response.json();
  const parent = document.getElementById("productContainer");
  
  for (const item of items) {
    new ShopItem(parent, {
      id: item.cd_produto,
      title: item.nm_produto,
      price: item.vl_produto,
      purchaseLink: item.ds_compra,
      demoImg: item.im_produto
    });
  }
}