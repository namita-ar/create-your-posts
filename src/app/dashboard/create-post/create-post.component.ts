import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/core/constants/constants';
import { CommonService } from 'src/app/core/services/common-services/common-service.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
createForm: FormGroup;
  constructor(private fb: FormBuilder,
     private service:DashboardService,
     private router :Router,
     private commonService:CommonService) { }

  ngOnInit(): void {
    this.createNewForm();
  }
  createNewForm() {
    this.createForm = this.fb.group({
      title: ['', {
        validators: [
          Validators.required,

        ],
        updateOn: 'change'
      }],
      body: ['', {
        validators: [Validators.required
        ],
        updateOn: 'change'
      }],



    });
  }
  createFormSubmit(){
    if(!this.createForm.valid){
      return;
    }
    let data = this.createForm.value;
    data = Object.assign(data, {"userId":1});
    this.service.createPost(data).subscribe((data)=>{
    this.commonService.showSuccess(MessageConstants.SUCCESS_TITLE,MessageConstants.SAVE_SUCESS_MSG)
     this.router.navigate(['dashboard']);
    },
    (error)=>{
      this.commonService.showSuccess(MessageConstants.ERROR_TITLE,"")
 
    })
  }
}
