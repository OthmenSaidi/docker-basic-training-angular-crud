import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  productFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(activatedRoute: ActivatedRoute, private ProductsService: ProductsService, private fb: FormBuilder) {//récuperer les id des produits pour cela on utlise activatedRoute

    this.productId = activatedRoute.snapshot.params.id;
  }



  ngOnInit(): void {
    this.ProductsService.getProducts(this.productId).subscribe(product => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required]

      })

    });

  }
  onUpdateProduct() {
    this.ProductsService.updateProduct(this.productFormGroup?.value).subscribe(data => {//ici on fait la mise à jour du produit en question et on affiche le message du success

      alert("success");

    })

  }

}
