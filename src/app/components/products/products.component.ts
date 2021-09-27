import { AppDataState, DataStateEnum, ProductActionTypes, ActionEvent } from './../../state/product.state';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }
  onGetAllProducts() {//pour gerer les erreurs on apllique .pipe + 3 étapes loading loaded et erreur

    //console.log("start....")
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }
  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }
  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }
  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data => {
      p.selected = data.selected;

    })


  }
  onDelete(p: Product) {
    let v = confirm("Etes vous sure ? ");
    if (v == true)
      this.productsService.deleteProduct(p).subscribe(data => {
        this.onGetAllProducts();

      })
  }
  onNewProduct() {
    this.router.navigateByUrl("/newProduct");

  }
  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/" + p.id)


  }
  onActionEvent($event: ActionEvent) {

    //console.log($event);
    // if ($event == "ALL_PRODUCTS") {
    //   this.onGetAllProducts();
    // }

    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionTypes.DELETE_PRODUCT: this.onDelete($event.payload); break;
      case ProductActionTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;





    }


  }

}
