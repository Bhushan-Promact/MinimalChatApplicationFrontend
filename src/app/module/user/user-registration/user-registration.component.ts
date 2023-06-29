import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
    private _utility: UtilityService) { }

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
    this._utility.registerUsersAsync(this.formData).subscribe((res) => {
      this.resetForm();
      this._toastr.success("User Registered Successfully")
      this._router.navigate(['login']);
    },
      (error: HttpErrorResponse) => {
        this._toastr.error(error.error.message);
      }
    );
  }

  resetForm() {
    this.registerFormGroup.controls['Name'].setValue("");
    this.registerFormGroup.controls['Email'].setValue("");
    this.registerFormGroup.controls['Password'].setValue("");
  }
}
