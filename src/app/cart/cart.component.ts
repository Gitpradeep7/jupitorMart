import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NetworkService } from '../network.service';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  currentUser:any;
  userItems:any;
  cartItems:any
  cartId:any;
  private cart = inject(CartService);
  private network = inject(NetworkService)
  ngOnInit(){
    let data = localStorage.getItem('jupiterCurrentUser');
    if(data){
      this.currentUser = JSON.parse(data);
    }
    this.cart.getCart().subscribe((cart:any)=>{
      cart.filter((res:any)=>{
        if(res.hasOwnProperty(this.currentUser.email)){
          this.userItems = res[this.currentUser.email];
          this.cartId = cart.find((item:any) =>{
            if(item[this.currentUser.email]){
              return item.id;
            }
          });
          this.network.getProductsFromOurServer().subscribe((products:any) =>{
            this.cartItems = products.filter((product:any) =>{
               return this.userItems.some((cart:any) => {
                return cart.productId === product.id
              })})
             .map((product:any) => {
                let cartt = this.userItems.find((cart:any) => cart.productId === product.id);
                return {...product, cartCount: cartt.count};
              })
              console.log('cc ',this.cartItems);
              
          });
        }
      });
  });
}
  removeAllItem(){
    this.cart.removeAllInCart(this.cartId.id).subscribe((res:any)=>{
      console.log('deleted item : ',res);
    })
  }
  removeItem(data:any){
    const dat = this.cartId[this.currentUser.email].filter((res:any)=>{
     return data.id !== res.productId;
    });
    let d ={[this.currentUser.email]:dat };
    this.cart.removeItem(d,this.cartId.id).subscribe((res:any)=>{
      console.log('removed item from cart ',res);
    });
  }
}