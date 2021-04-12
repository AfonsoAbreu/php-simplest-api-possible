import ShopItem from '../../../public/js/shopItem.js';

async function fetchProducts () {
  const response = await fetch(
    "http://localhost/projeto-teste-pwiii-ds/02-trabalho-pra-mencao/api/product", 
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
  
  if (items.length > 0) {
    const err = document.getElementById("err");
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
  }
}

fetchProducts();