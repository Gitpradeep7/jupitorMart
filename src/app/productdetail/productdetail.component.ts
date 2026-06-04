import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../network.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {

constructor(private route: ActivatedRoute,private network: NetworkService,private cartservice: CartService) {}
product:any ={};
quantity: number = 0;
currentmail: string ='';
ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');
  this.network.getProductById(productId).subscribe((res:any) =>{
    this.product = res;
  })
 
}
  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity >= 1) {
      this.quantity--;
    }
  }

  addToCart() {
    let data = localStorage.getItem('jupiterCurrentUser');
    if (!data) return;

    const userEmail = JSON.parse(data).email;
    
    this.cartservice.getCart().subscribe((cartArray: any) => {
        let userCartObj = cartArray.find((item: any) => item.hasOwnProperty(userEmail));

        if (userCartObj) {
            let items = userCartObj[userEmail];
            let productIndex = items.findIndex((p: any) => p.productId === this.product.id);

            if (productIndex > -1) {
                items[productIndex].count = items[productIndex].count + this.quantity;
              } else {
                items.push({ productId: this.product.id, count: this.quantity });
              }
              userCartObj[userEmail] = items;

            this.cartservice.updateCart(userCartObj,userCartObj.id).subscribe(res => {
                console.log('Cart updated (PATCH):', res);
            });

        } else {
            const newCartEntry = {
                [userEmail]: [{ productId: this.product.id, count: this.quantity }]
            };

            this.cartservice.uploadCart(newCartEntry).subscribe(res => {
                console.log('New cart created (POST):', res);
            });
        }
    });
}

  // addToCart() {
  //   let data = localStorage.getItem('jupiterCurrentUser');
  //   let cartItems = {}
  //   // if data is there in localstorage
  //   if(data){
  //     let mail = JSON.parse(data).email;
  //     let pro ={};
  //     let carrt =[];
  //     this.cartservice.getCart().subscribe((cart:any)=>{
  //       if(cart[mail]=== mail && cart.length !=0){
  //        cartItems = cart[mail].forEach((prod:any)=>{
  //           if(prod.productId === this.product.id){
  //             cart[mail][0].push({productId:this.product.id,count: this.quantity});
  //           // pro= {[mail]:[{productId:this.product.id,count: this.quantity}]}
  //           // carrt.push(pro);
  //           } else {
  //           pro= {productId:this.product.id,count: this.quantity}
  //           }
  //           // let d = cart[mail].push(pro);
  //           // return {...cartItems,[mail]: d}
  //         });
  //         this.cartservice.updateCart(cartItems).subscribe((res:any)=>{
  //         console.log('update ',res);
  //       })
  //       } else {
  //         cartItems = {[mail]:[{productId:this.product.id,count: this.quantity}]}
  //         this.cartservice.uploadCart(cartItems).subscribe((res:any)=>{
  //           console.log('upload ',res);
  //         })
  //       }
  //     })
  //    //console.log('cart ',cartData);
  //   }
  //   //this.product.quantity = this.quantity;
  //   console.log(`Added ${this.quantity} items of ${this.product} to cart.`);
  // }
}
