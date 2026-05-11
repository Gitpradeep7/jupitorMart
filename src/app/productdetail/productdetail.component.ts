import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {

constructor(private route: ActivatedRoute,private network: NetworkService) {}
product:any ={};
quantity: number = 1;
ngOnInit() {
  // URL se ID nikalne ke liye
  const productId = this.route.snapshot.paramMap.get('id');
  this.network.getProduct(productId).subscribe((res:any) =>{
    this.product = res;
  })
  // Ab aap is ID ka use karke API se data fetch kar sakte hain
}
  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    console.log(`Added ${this.quantity} items of ${this.product.title} to cart.`);
  }
}
