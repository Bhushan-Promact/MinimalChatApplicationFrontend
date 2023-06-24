import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  registerFormGroup: any;
  formData: any;

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _utility: UtilityService) { }
  ngOnInit(): void {
    this.onLoadFormInIt();
  }

  onLoadFormInIt() {
    this.registerFormGroup = this.fb.group({
      Name: '',
      Email: '',
      Password: ''
    });
  }

  OnSubmit() {
    this.formData = this.registerFormGroup.value;
    this._utility.registerUsersAsync(this.formData).subscribe((data: any) => {
      if (data == null) {
        throw 'Empty response';
      }
      else {
        console.log(data);
      }
    },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.status.toString());
      }
    );
  }

}
