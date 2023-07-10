import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../../state/product.state";
import {Product} from "../../../../model/Product.model";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent {

  @Input() product!: Product;
  @Output() productEventEmitter: EventEmitter<ActionEvent>= new EventEmitter();

  getSelectedProduct(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCT, payload: product});
  }

  deleteProduct(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: product});
  }

  editProduct(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});
  }
}
