import {Component} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/Product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public products$: Observable<AppDataState<Product[]>> | null = null;
  public readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductsService,
              private router: Router) {
  }


  public fetchAllProducts() {
    this.products$ = this.productsService.fetchAllProducts()
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage:err.message})
        ));
  }

  selectedProducts() {
    this.products$ = this.productsService.selectedProducts()
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage:err.message})
        ));
  }

  availableProducts() {
    this.products$ = this.productsService.availableProducts()
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage:err.message})
        ));
  }

  searchProducts(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword)
      .pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage:err.message})
        ));
  }

  getSelectedProduct(product: Product) {
    this.productsService.getSelectedProduct(product)
      .subscribe({
        next: data => {
          product.selected = !product.selected;
        },
        error: err => {
          console.log("errorMessage: "+err);
        },
      });
  }

  deleteProduct(product: Product) {
    if (confirm("Are you sure?"))
    this.productsService.deleteProduct(product)
      .subscribe({
        next: Product => {
          this.fetchAllProducts();
        },
        error: err => {
          console.log("errorMessage: "+err);
        },
      })
  }

  createNewProduct() {
    this.router.navigateByUrl("/newProduct").then(e=>{
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  editProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`).then(e=>{
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  onActionEvent($event: ActionEvent) {
    console.log($event);
    switch ($event.type) {
      case ProductActionsTypes.FETCH_ALL_PRODUCTS: this.fetchAllProducts();
      break;
      case ProductActionsTypes.SELECTED_PRODUCTS: this.selectedProducts();
        break;
      case ProductActionsTypes.AVAILABLE_PRODUCTS: this.availableProducts();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.searchProducts($event.payload);
        break;
      case ProductActionsTypes.CREATE_NEW_PRODUCT: this.createNewProduct();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCT: this.getSelectedProduct($event.payload);
        break;
      case ProductActionsTypes.EDIT_PRODUCT: this.editProduct($event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCT: this.deleteProduct($event.payload);
        break;
    }
  }
}
