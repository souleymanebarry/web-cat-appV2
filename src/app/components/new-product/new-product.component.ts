import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {EventDriverService} from "../../services/event.driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  productFormGroup!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private eventDriverService: EventDriverService) {
  }

  get fields(): { [key: string]: AbstractControl } {
    return this.productFormGroup.controls;
  }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }

  saveProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.productsService.saveProduct(this.productFormGroup.value)
      .subscribe({
        next: value => {
          this.eventDriverService.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED});
          alert('Save successfully!')
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
