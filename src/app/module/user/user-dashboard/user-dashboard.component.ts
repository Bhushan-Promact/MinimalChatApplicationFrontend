import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  userList: any;

  constructor(
    private _toastr: ToastrService,
    private _utility: UtilityService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this._utility.getUsersAsync().subscribe(
      (data) => { this.userList = data; },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString());
      }
    )
  }

  getUserConversationHistory(user:any){
    this._utility.getUserConversationHistory().subscribe(
      (data) => { this.userList = data; },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString());
      }
    );
  }

}
