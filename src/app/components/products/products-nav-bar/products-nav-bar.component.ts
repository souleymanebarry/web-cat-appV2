import {Component, EventEmitter, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {

  @Output() productEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();

  fetchAllProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.FETCH_ALL_PRODUCTS});
  }

  selectedProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.SELECTED_PRODUCTS});
  }

  availableProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.AVAILABLE_PRODUCTS});
  }

  createNewProduct() {
    this.productEventEmitter.emit({type: ProductActionsTypes.CREATE_NEW_PRODUCT});
  }

  searchProducts(keyword: any) {
    this.productEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload:keyword});
  }
}
