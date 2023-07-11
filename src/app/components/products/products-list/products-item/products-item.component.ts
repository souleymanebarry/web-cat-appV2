import {Component, Input} from '@angular/core';
import {ProductActionsTypes} from "../../../../state/product.state";
import {Product} from "../../../../model/Product.model";
import {EventDriverService} from "../../../../services/event.driver.service";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent {

  @Input() product!: Product;

  constructor(private eventDriverService: EventDriverService) {
  }

  getSelectedProduct(product: Product) {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.GET_SELECTED_PRODUCT, payload: product});
  }

  deleteProduct(product: Product) {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.DELETE_PRODUCT, payload: product});
  }

  editProduct(product: Product) {
    this.eventDriverService.publishEvent({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});

  }
}
