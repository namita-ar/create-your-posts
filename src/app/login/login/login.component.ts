import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common-services/common-service.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router,
    private commonService: CommonService) {
    this.createLoginForm()
  }

  ngOnInit(): void {
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,

        ],
        updateOn: 'change'
      }],
      password: ['', {
        validators: [Validators.required
        ],
        updateOn: 'change'
      }],



    });
  }
  login() {
    if (!this.loginForm.valid) {
      return;
    }
    if (this.loginForm.value.email === this.localStorage.get('email') && this.loginForm.value.password === this.localStorage.get('password')) {
      this.router.navigate(['dashboard']);
    }
    else{
      //error message
      this.commonService.showError('Invalid Credentials','Please try again')

    }
  }
}
