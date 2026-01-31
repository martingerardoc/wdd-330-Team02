import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  // constructor(category, dataSource, listElement) {
  //   this.category = category;
  //   this.dataSource = dataSource;
  //   this.listElement = listElement;
  // }

  //Add another parameter to the constructor to sort the data
  constructor(category, dataSource, listElement, sortBy) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortBy = sortBy;
  }

  async init() {
    // const list = await this.dataSource.getData(this.category);
    // Pass the Sort By parameter to the new getData function
    const list = await this.dataSource.getData(this.category, this.sortBy);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    // renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

}