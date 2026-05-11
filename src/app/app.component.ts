import { Component } from '@angular/core';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  islogout:any;
  constructor(private network: NetworkService){}
  ngOnInit(){
    this.network.logoutFlag().subscribe((res)=>{
      this.islogout = res;
    })
  }
  title = 'jupitor-mart';
}
