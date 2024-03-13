import { Component } from '@angular/core';
import { Sub } from 'src/models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  constructor(private subService : SubscribersService){}

  isEmailError: boolean = false;
  isSubscribe : boolean = false;

  onSubmit(formValue: any){
    //  console.log(formValue)
    const subData : Sub = {
      name : formValue.name,
      email : formValue.email
    }
    // this.subService.addSubs(subData)
    this.subService.checkSubs(subData.email).subscribe(val => {
      console.log(val)
      if( val.empty ){
        this.subService.addSubs(subData);
        this.isSubscribe = true;
      }else {
         console.log( 'Email Address is  Already in Used!')
         this.isEmailError = true;
      }
    })
  }

}
