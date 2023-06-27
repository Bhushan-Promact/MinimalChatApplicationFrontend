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

  constructor(private _utility: UtilityService,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _router: Router) { }

  ngOnInit() {
    this.myUserId = this._utility.getUserId()?.toString();
    this.onLoadFormInIt();
    this.resetGroup();
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
        this._utility.getUserConversationHistory(receiverId).subscribe(
          (res) => { this.userMessageList = res; this.messageForm.reset(); });
      },
      (error) => {
        this._toastr.error(error.status.toString());
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
          this._utility.getUserConversationHistory(receiverId).subscribe(
            (res) => { this.userMessageList = res; this.messageForm.reset(); });
          this._toastr.success("Message Updated")
          this.resetGroup();
        }
      );
    }
  }

  OnDeleteMessage() {
    let result = confirm("Want to delete?");
    let receiverId = localStorage.getItem('receiverId')!.toString();
    if (result) {
      this._utility.deleteMessageAsync(this.messageId).subscribe(
        (res) => { this._toastr.success("Message Deleted") })
      this._utility.getUserConversationHistory(receiverId).subscribe(
        (res) => { this.userMessageList = res; this.messageForm.reset(); });
      this.resetGroup();
    }
  }

  resetGroup() {
    this.isUpdateGroup = false;
    this.isMessageGroup = true;
    this.messageForm.reset();
    this.updateMessageForm.reset();
  }
}
