import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  updateMessageForm: any;
  isMessageGroup: boolean = true;
  isUpdateGroup: boolean = false;
  messageId: any;
  @Input() userMessageList: any;

  sorting: any;

  constructor(private _utility: UtilityService,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _router: Router) { }

  ngOnInit() {
    this.myUserId = this._utility.getUserId()?.toString();
    this.onLoadFormInIt();
    this.resetGroup();
    this._utility.sorting.subscribe((res) => {
      this.sorting = res;
      this.updateHistory();
    })
  }

  onLoadFormInIt() {
    this.messageForm = this.fb.group({
      TextMessage: ''
    });
    this.updateMessageForm = this.fb.group({
      TextMessage: ''
    });
  }

  OnSubmit() {
    let receiverId = localStorage.getItem('receiverId')!.toString();
    let obj = {
      ReceiverId: receiverId,
      TextMessage: this.messageForm.value.TextMessage.toString()
    }
    this._utility.postMessageAsync(obj).subscribe(
      (res) => {
        this.resetGroup();
        this.updateHistory();
      },
      (error) => {
        this._toastr.error(error.status.toString(), error.error.messages);
        this.resetGroup();
        this.updateHistory();
      }
    );
  }

  OnMessageClick(messageGroup: any) {
    let senderId = localStorage.getItem('userId')!.toString();
    if (messageGroup.senderId === senderId) {
      this.isUpdateGroup = true;
      this.isMessageGroup = false;
      this.updateMessageForm.controls['TextMessage'].setValue(messageGroup.textMessage);
      this.messageId = messageGroup.messageId;
    }
    else {
      this.resetGroup();
    }
  }
  valid() {
    return this.messageForm.controls();
  }

  OnUpdateMessage() {
    let result = confirm("Want to Update?");
    let receiverId = localStorage.getItem('receiverId')!.toString();
    let obj = {
      MessageId: this.messageId,
      TextMessage: this.updateMessageForm.value.TextMessage
    }
    if (result) {
      this._utility.updateMessageAsync(obj).subscribe(
        (res) => {
          this._toastr.success("Message Updated")
          this.resetGroup();
          this.updateHistory();
        },
        (error) => {
          this._toastr.error(error.status.toString(), error.error.messages);
          this.resetGroup();
          this.updateHistory();
        }
      );
    }
  }

  OnDeleteMessage() {
    let result = confirm("Want to delete?");
    if (result) {
      this._utility.deleteMessageAsync(this.messageId).subscribe(
        (res: any) => {
          this.resetGroup();
          this.updateHistory();
          console.log(res.error.message);
        },
        (error) => {
          this.resetGroup();
          this.updateHistory();
          console.error(error.error.messages);
        }
      );
    }
  }

  updateHistory() {
    let receiverId = localStorage.getItem('receiverId')!.toString();
    this._utility.getUserConversationHistory(receiverId, this.sorting).subscribe(
      (res) => { this.userMessageList = res; this.messageForm.reset(); console.log(res);
       },
      (error) => { this._toastr.error(error.status.toString(), error.error.messages); }
    );
  }

  resetGroup() {
    this.isUpdateGroup = false;
    this.isMessageGroup = true;
    this.messageForm.reset();
    this.updateMessageForm.reset();
  }
}
