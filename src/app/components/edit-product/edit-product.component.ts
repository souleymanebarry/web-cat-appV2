import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../services/event.driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  public productId!: number;
  public productFormGroup!: FormGroup;
  public submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private formBuilder: FormBuilder,
              private eventDriverService: EventDriverService) {
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
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productsService.updateProduct(this.productFormGroup.value)
      .subscribe({
        next: value => {
          this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED, payload:value})
          alert("updated success !");
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
