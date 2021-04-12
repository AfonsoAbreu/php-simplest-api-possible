import ShopItem from '../../../public/js/shopItem.js';

async function fetchProducts () {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/php-simplest-api-possible/api/product", 
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }
  );

  const items = await response.json();
  const parent = document.getElementById("productContainer");
  const err = document.getElementById("err");
  const previousItems = document.querySelectorAll(".shop-item");
  previousItems.forEach(e => parent.removeChild(e));//remove os itens antigos
  
  if (items.length > 0) {
    err.textContent = "";
    err.style.display = "none";
    for (const item of items) {
      new ShopItem(parent, {
        id: item.cd_produto,
        title: item.nm_produto,
        price: item.vl_produto,
        purchaseLink: item.ds_compra,
        demoImg: item.im_produto
      });
    }
  } else {
    err.textContent = "Oops... Ainda não temos produtos a venda :´(";
    err.style.display = "block";
  }
}


fetchProducts();
setInterval(fetchProducts, 5000);