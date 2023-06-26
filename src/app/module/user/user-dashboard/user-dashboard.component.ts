import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  userMessageList: any;
  userList: any;

  constructor(
    private _toastr: ToastrService,
    private _utility: UtilityService,
    private _router: Router,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this._utility.getUsersAsync().subscribe(
      (data) => {
        this.userList = data;
      },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString());
      }
    )
  }

  getUserConversationHistory(user: any) {

    localStorage.setItem('receiverId',user.userId);
    this._utility.getUserConversationHistory(user.userId).subscribe(
      (data: any) => {
        this.userMessageList = data;
      },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString());
        this.userMessageList=null;
      }
    );
  }
}

