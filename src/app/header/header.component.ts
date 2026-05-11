import { Component } from '@angular/core';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser:any = {};
  constructor(private network : NetworkService){

  }
  ngOnInit(){
    this.network.getUser().subscribe((res:any)=>{
      console.log(res,' get user 123 ',res?.name);
      this.currentUser = res?.name;
    });
  }

  logout(){
    this.network.logout(true);
  }
}
