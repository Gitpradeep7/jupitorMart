import { Component } from '@angular/core';
import { NetworkService } from '../network.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser:any = {};
  currenturl:string='';
  cartCount:any= [];
  constructor(private network : NetworkService, private cart: CartService){
  }
  ngOnInit(){
    let data = localStorage.getItem('jupiterCurrentUser');
    if(data){
      this.currentUser = JSON.parse(data);
    }

    this.cart.getCart().subscribe((cart:any)=>{
      cart.filter((res:any)=>{
        if(res.hasOwnProperty(this.currentUser.email)){
          this.cartCount = res[this.currentUser.email];
          console.log('cartcount',this.cartCount, '** ',Array.isArray(this.cartCount));
        }
      });
    })
  }


  logout(){
    this.network.logout(true);
  }
}
