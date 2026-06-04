import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) { }

  uploadCart(data:any){
    return this.http.post(this.apiUrl,data);
  }

  updateCart(data:any,id:any){
    return this.http.patch(`${this.apiUrl}/${id}`,data);
  }

  getCart(){
    return this.http.get(this.apiUrl);
  }

  removeAllInCart(data:any){
    return this.http.delete(`${this.apiUrl}/${data}`);
  }

  removeItem(data:any,id:any){
    return this.http.patch(`${this.apiUrl}/${id}`,data);
  }

}
