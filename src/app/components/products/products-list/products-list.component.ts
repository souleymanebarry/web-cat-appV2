import {Component, Input} from '@angular/core';
import {AppDataState, DataStateEnum} from "../../../state/product.state";
import {Observable} from "rxjs";
import {Product} from "../../../model/Product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  readonly DataStateEnum = DataStateEnum;
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;

}
