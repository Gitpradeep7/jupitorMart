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
ngOnInit(){
  this.network.getCart();
  this.network.cartItem$.subscribe((res:any) =>{
    console.log('network cart ',res);
  })
  const storedUser = localStorage.getItem('jupiterCurrentUser');
  if (storedUser) {
    const data = JSON.parse(storedUser);
    this.currentUser = data;
  }
  this.network.getProductsFromOurServer().subscribe((res:any) =>{
    if(res.length== 0){
      this.network.getProducts().subscribe((res:any)=>{
        this.products = res;
        this.network.updateProductsInOurServer(res).subscribe((resp:any) =>{
          console.log('got in server ',resp);
        });
      });
    } else {
      this.products = res;
    }
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
