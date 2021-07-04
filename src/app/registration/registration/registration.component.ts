import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/common-services/must-match-validator';
import { RegistrationService } from '../service/registration.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  registrationSubmitted :boolean=false;
  constructor(private fb: FormBuilder,
    private regService:RegistrationService) {
  this.createRegistrationForm();
  }

  ngOnInit(): void {
  }
  createRegistrationForm(){
    this.registerForm = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          Validators.minLength(1)
        ],
        updateOn: 'change'
      }],
      firstName: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9-_. ]+$/),
          Validators.minLength(1)
        ],
        updateOn: 'change'
      }],
      lastName: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9-_. ]+$/),
          Validators.maxLength(50)
        ],
        updateOn: 'change'
      }],
      password: ['', {
        validators: [Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$)/)],
        updateOn: 'change'
      }],
     
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get r() {
    return this.registerForm.controls;
  }
  register(){
    this.registrationSubmitted =true;
    if(!this.registerForm.valid){
      return;
    }

    this.regService.register(this.registerForm.value);

  }
}


