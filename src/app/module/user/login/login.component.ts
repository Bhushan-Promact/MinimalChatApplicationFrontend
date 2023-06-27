import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup: any;
  formData: any;

  constructor(private fb: FormBuilder,
    private _toastr: ToastrService,
    private _utility: UtilityService,
    private _router: Router) { }
  ngOnInit(): void {
    this.onLoadFormInIt();
  }

  onLoadFormInIt() {
    this.loginFormGroup = this.fb.group({
      Email: '',
      Password: ''
    });
  }

  OnSubmit() {
    this.formData = this.loginFormGroup.value;
    this._utility.loginUserAsync(this.formData).subscribe((data: any) => {
      if (data == null) {
        throw 'Empty response';
      }
      else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.userId);
        this._router.navigateByUrl('dashboard');
      }
    },
      (error) => {
        this._toastr.error(error.status.toString());
      }
    );
  }

}
