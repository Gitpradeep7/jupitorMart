import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: any;

constructor(private router: Router) {}

  goToDetails(id:any){
    this.router.navigate(['/product', id]);
  }
}
