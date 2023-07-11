import {Component, EventEmitter, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";
import {EventDriverService} from "../../../services/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {

 // @Output() productEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) {
  }

  fetchAllProducts() {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.FETCH_ALL_PRODUCTS});
  }

  selectedProducts() {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.SELECTED_PRODUCTS});
  }

  availableProducts() {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.AVAILABLE_PRODUCTS});
  }

  createNewProduct() {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.CREATE_NEW_PRODUCT});
  }

  searchProducts(keyword: any) {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.SEARCH_PRODUCTS, payload:keyword});
  }
}
