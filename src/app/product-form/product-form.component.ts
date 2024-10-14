import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  editMode = false;
  currentProductId!: number | undefined;
  
  constructor(private userService: ProductService, private formBuilder: FormBuilder) { 
    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.userService.getProducts().subscribe((products: Product[]) => this.products = products);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const user: Product = this.productForm.value;
  
      if (this.editMode && this.currentProductId !== null) {
        user.id = this.currentProductId;
        this.userService.updateProduct(user).subscribe((data) => {
          console.log(data)
          this.loadProducts();
          this.resetForm();
        });
      } else {
        this.userService.addProduct(user).subscribe(() => {
          this.loadProducts();
          this.resetForm();
        });
      }
    }
  }
  

  resetForm(): void {
    this.productForm.reset();
    this.editMode = false;
    this.currentProductId = -1;
  }

  editProduct(product: Product): void {
    this.productForm.patchValue(product);
    this.editMode = true;
    this.currentProductId = product.id;
  }

  deleteProduct(id: number | undefined): void {
    this.userService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

}
