import ShopItem from '../../../public/js/shopItem.js';

async function fetchProducts (previousItems) {
  const response = await fetch(
    "./api/product", 
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
  let currentItems = [...document.querySelectorAll(".shop-item")];

  const equal = equals(currentItems, previousItems);
  if (!equal || (items.length > 0 && items.length !== currentItems.length)) {
    currentItems.forEach(e => parent.removeChild(e));//remove os itens antigos
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
    currentItems = [...document.querySelectorAll(".shop-item")];
  } else if (!equal) {
    currentItems.forEach(e => parent.removeChild(e));//remove os itens antigos
    currentItems = [...document.querySelectorAll(".shop-item")]
    err.textContent = "Oops... Ainda não temos produtos a venda :´(";
    err.style.display = "block";
  }

  setTimeout(() => fetchProducts(currentItems), 5000);
}

function equals (a, b) {
  return a.length === b.length && a.every((e, i) => e === b[i]);
}

const currentItems = [...document.querySelectorAll(".shop-item")];
fetchProducts(currentItems);