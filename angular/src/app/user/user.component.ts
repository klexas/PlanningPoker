import { Component } from "@angular/core";
import { UserModel } from "models/user/userModel";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  user:UserModel;

  constructor(private route: ActivatedRoute) {

  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = {
        id: params['id'],
        username: "admin",
        dailyMessage: "Ossum message daily"
      };
      console.log(params) 
      console.log(params['id']) //log the value of use id
    });
  }
}