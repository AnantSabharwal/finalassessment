import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9000/finalassessment/product'
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }
  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}`,product);
  }

  deleteProduct(id:number|undefined): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
