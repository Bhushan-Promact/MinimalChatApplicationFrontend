import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [DatePipe]
})

export class UserDashboardComponent {
  userMessageList: any;
  userList: any;
  myDate: any;
  sortingForm: any;
  sorting: any;

  constructor(
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _utility: UtilityService,
    private _router: Router,
    private datePipe: DatePipe,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.OnFormLoad();
    this.getUserList();
    this._utility.sorting.subscribe(
      (res) => { this.sorting = res }
    );
    this.Sorting();
  }

  OnFormLoad() {
    this.sortingForm = this._fb.group({
      Before: [this.myDate, ''],
      Count: [20, ''],
      Sort: ['asc', '']
    });
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
    localStorage.setItem('receiverId', user.userId);
    this._utility.getUserConversationHistory(user.userId, this.sorting).subscribe(
      (data: any) => {
        this.userMessageList = data;
      },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString() + " " + error.error);
        this.userMessageList = null;
      }
    );
  }

  OnClickLogout() {
    localStorage.clear();
    this._router.navigateByUrl('login');
    this._toastr.success("Logged Out Successfully")
  }

  Sorting() {
    this._utility.sorting.next(this.sortingForm.value);
  }
}

