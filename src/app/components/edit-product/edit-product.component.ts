import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  public productId!: number;
  productFormGroup!: FormGroup;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private formBuilder: FormBuilder) {
    this.productId = activatedRoute.snapshot.params['id'];
  }

  get fields(): { [key: string]: AbstractControl } {
    return this.productFormGroup.controls;
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.productId)
      .subscribe({
        next: product => {
          this.productFormGroup = this.formBuilder.group({
            id: [product.id, Validators.required],
            name: [product.name, Validators.required],
            price: [product.price, Validators.required],
            quantity: [product.quantity, Validators.required],
            selected: [product.selected, Validators.required],
            available: [product.available, Validators.required]
          });
        },
        error: err => {
          console.log(err);
        },
      })
  }

  updateProduct() {
    this.productsService.updateProduct(this.productFormGroup.value)
      .subscribe({
        next: value => {
          alert("updated success !");
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
