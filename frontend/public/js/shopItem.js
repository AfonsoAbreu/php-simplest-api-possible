export default class ShopItem {
  constructor (parent, properties, isDemo = false) {
    this.parent = parent;
    this.self = null;
    this.title = properties.title;
    this._price = properties.price;
    this.purchaseLink = properties.purchaseLink;
    this.demoImg = properties.demoImg;
    this.isDemo = isDemo;
    this.id = properties.id;
    this.Build();
  }

  Build () {
    if (this.self) {
      this.self.setAttribute("individualId", this.id);//update id
      this.self.children[0].src = this.demoImg ? this.demoImg : "/projeto-teste-pwiii-ds/php-simplest-api-possible/frontend/public/img/placeholder.jpg";//update demoImg
      this.self.children[1].children[0].textContent = this.price ? this.price : "R$X.XXX,XX"//update price
      this.self.children[1].children[1].textContent = this.title ? this.title : "Nome"//update title
    } else {
      this.parent.innerHTML += this._innerHTML();
      this.self = [...this.parent.children].find(e => e.getAttribute("individualId") === this.id);
    }
  }

  _filterPrice (price) {
    return Number(price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  _innerHTML () {
    if (this.isDemo) {
      this.id = Math.random().toString();
      return `
        <a class="bg-gray-100 rounded-lg overflow-hidden mb-10 shadow-lg cursor-not-allowed transition flex flex-col mx-auto w-full" individualId="${this.id}">
          <img src="${this.demoImg ? this.demoImg : "/projeto-teste-pwiii-ds/php-simplest-api-possible/frontend/public/img/placeholder.jpg"}" class="rounded-b-lg object-cover h-56 w-full" onerror="this.src='/projeto-teste-pwiii-ds/php-simplest-api-possible/frontend/public/img/placeholder.jpg'">
          <div class="px-5 py-2 flex flex-col h-full flex-grow">
            <p class="text-3xl font-sans price-tag">${this.price ? this.price : "R$X.XXX,XX"}</p>
            <p class="card-title">${this.title ? this.title : "Nome"}</p>
            <button class="mx-auto block bg-gray-600 text-2xl price-tag text-gray-100 px-6 py-1 mt-2 rounded-full font-bold flex flex-row items-center cursor-not-allowed">
              <i class="fas fa-shopping-cart mr-2 block font-normal"></i>
              COMPRAR
            </button>
          </div>
        </a>  
      `;
    } else {
      return `
        <a class="shop-item bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:bg-gray-200 cursor-pointer transition flex flex-col h-96 mb-10 w-full min-w-custom max-w-custom md:mx-3 md:flex-1" href="${this.purchaseLink}" target="_blank" individualId="${this.id}">
          <img src="${this.demoImg}" class="rounded-b-lg object-cover h-56 w-full" onerror="this.src='/projeto-teste-pwiii-ds/php-simplest-api-possible/frontend/public/img/placeholder.jpg'">
          <div class="px-5 py-2 flex flex-col h-full flex-grow">
            <p class="text-3xl font-sans price-tag">${this.price}</p>
            <p class="card-title">${this.title}</p>
            <button class="mx-auto block bg-green-500 text-2xl price-tag text-gray-100 px-6 py-1 rounded-full font-bold mt-auto hover:bg-gray-100 hover:text-green-500 hover:shadow transition flex flex-row items-center">
              <i class="fas fa-shopping-cart mr-2 block font-normal"></i>
              COMPRAR
            </button>
          </div>
        </a>
      `;
    }

  }

  set price (val) {
    this._price = val;
  }

  get price () {
    return this._filterPrice(this._price);
  }

  reset () {
    this.title = null;
    this.price = null;
    this.purchaseLink = null;
    this.demoImg = null;
  }
}