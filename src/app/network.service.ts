import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isLogout = new BehaviorSubject<boolean>(false);
  isLogout$ = this.isLogout.asObservable();
  
  existProductAPIURL = 'http://localhost:3000/products';
  productAPI = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {
    localStorage.setItem('isLoggedIn','fasle');
  }

  private cart = inject(CartService);
  private cartItem = new Subject<any>();
  cartItem$ = this.cartItem.asObservable();
  email: any;
  ngOnInit() {}

  getCart(){
    let m = localStorage.getItem('jupiterCurrentUser');
    let currentUser ='';
    if(m){
      currentUser = JSON.parse(m).email;
    }
    this.cart.getCart().subscribe((cart:any)=>{
      let g = cart.filter((ca:any) =>{
         //ca.includes(currentUser)
      })
      console.log(' ** ',g);
      if(cart[currentUser]){
        console.log('cartt ',g)
        this.cartItem.next(cart[currentUser]);
      }
    })
  }
  getProducts() {
    return this.http.get(this.productAPI);
  }

  getProductsFromOurServer() {
    return this.http.get(this.existProductAPIURL);
  }

  updateProductsInOurServer(data: any) {
    data.forEach((product: any) => {
      this.http.post(this.existProductAPIURL, product).subscribe((res) => {
        console.log('123 :: ', res);
      });
    });
    return this.http.post(this.existProductAPIURL, data);
  }

  getProductById(id: any) {
    return this.http.get(`${this.existProductAPIURL}/${id}`);
  }

  logout(islogout: boolean) {
    this.isLogout.next(islogout);
  }

  logoutFlag() {
    return this.isLogout$;
  }
}
