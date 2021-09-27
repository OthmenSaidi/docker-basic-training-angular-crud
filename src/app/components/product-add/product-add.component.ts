import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {


  productFormGroup = this.fb.group({

    name: ["", Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    selected: [true, Validators.required],
    available: [true, Validators.required],


  });
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private ProductsService: ProductsService) { }

  ngOnInit(): void {

  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.ProductsService.save(this.productFormGroup.value).subscribe(data => {
      alert("success");
    });

  }


}
