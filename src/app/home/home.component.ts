import { Component } from '@angular/core';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products:any;
  originalProducts:any;
  searchItem:string='';
  currentUser: any = {};
constructor(private network: NetworkService){
}
data =[ {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 159.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
        rate: 3.9,
        count: 120
    }
}]
ngOnInit(){
  this.network.getUser().subscribe((res: any) =>{
    this.currentUser = res;
   });
  const mock = this.data.map((res:any)=>{
    return {...res,price: res.price + 50}
  });
  this.network.getStore().subscribe((res:any)=>{
    this.products = res.map((val: any)=>{
      return {...val, price: val.price + 50}
    });
    this.originalProducts = this.products;
  });
}

  filteredProducts() {
    if (!this.searchItem) {
      return this.products;
    }
    return this.products.filter((product : any )=>
      product.title.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchItem.toLowerCase())
    );
  }
}
