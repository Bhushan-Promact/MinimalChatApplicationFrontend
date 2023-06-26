import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent {
  myUserId: any = "";
  messageForm: any;
  @Input() userMessageList: any;

  constructor(private _utility: UtilityService,
    private _toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.myUserId = this._utility.getUserId()?.toString();
    this.onLoadFormInIt();
  }

  onLoadFormInIt() {
    this.messageForm = this.fb.group({
      TextMessage: ''
    });


  }
  OnSubmit() {
    let receiverId =localStorage.getItem('receiverId')!.toString();
    let obj ={
      ReceiverId: receiverId,
      TextMessage: this.messageForm.value.TextMessage.toString()
    }
    this._utility.postMessageAsync(obj).subscribe(
      (res) => {
        console.log(res);
        this.userMessageList();
      },
      (error) => {
        this._toastr.error(error.status.toString());
      }
    );
  }
}
