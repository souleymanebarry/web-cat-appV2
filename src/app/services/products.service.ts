import { Injectable } from '@angular/core';
import {environmentDevelopment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiServerUrl: string = environmentDevelopment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public fetchAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiServerUrl}/products`);
  }

  public selectedProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiServerUrl}/products?selected=true`);
  }

  public availableProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiServerUrl}/products?available=true`);
  }


  public searchProducts(keyword: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.apiServerUrl}/products?name_like=${keyword}`);
  }

  public getSelectedProduct(product: Product): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.apiServerUrl}/products/${product.id}`,
      { selected: !product.selected});
  }

  public deleteProduct(product: Product): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/products/${product.id}`);
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiServerUrl}/products/`,product);
  }

  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiServerUrl}/products/${productId}`);
  }


  public updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiServerUrl}/products/${product.id}`,product);
  }
}
